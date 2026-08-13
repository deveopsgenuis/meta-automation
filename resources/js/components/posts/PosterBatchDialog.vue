<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import {
    IconAlertCircle,
    IconCheck,
    IconChevronDown,
    IconFiles,
    IconPhoto,
    IconRefresh,
    IconSettings,
    IconSparkles,
    IconX,
} from '@tabler/icons-vue';
import { computed, onUnmounted, reactive, ref, watch } from 'vue';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import MediaPickerDialog from '@/components/posts/MediaPickerDialog.vue';
import {
    batch as batchRoute,
    execute,
    generate,
} from '@/routes/app/posts/ai/plan';
import { retry } from '@/routes/app/posts/ai/plan/batch';

interface SocialAccount {
    id: string;
    platform: string;
    display_name: string;
    username?: string | null;
    avatar_url?: string | null;
    is_active?: boolean;
}

interface PlanItem {
    post_description: string;
    post_hashtags: string;
    post_visual_prompt: string;
    poster_size: string;
    scheduled_date: string;
}

interface BatchItemData {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    post_id?: string | null;
    image_url?: string | null;
    error?: string | null;
    plan_data?: PlanItem;
}

interface ActiveBatch {
    id: string;
    status: 'pending' | 'generating' | 'completed' | 'failed';
    total_items: number;
    completed_items: number;
    failed_items: number;
    items?: BatchItemData[];
}

interface Props {
    modelValue: boolean;
    totalPosts?: number;
    startDate?: string;
    socialAccounts?: SocialAccount[];
    activeBatch?: ActiveBatch | null;
}

const props = withDefaults(defineProps<Props>(), {
    totalPosts: 7,
    startDate: '',
    socialAccounts: () => [],
    activeBatch: null,
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    'batch-created': [batchId: string];
}>();

const page = usePage();

const open = computed({
    get: () => props.modelValue,
    set: (val: boolean) => handleRequestClose(val),
});

// State
const selectedSocialAccountId = ref<string | null>(
    props.socialAccounts[0]?.id ?? null,
);
const instruction = ref('');
const showInstructionModal = ref(false);
const isGeneratingPlan = ref(false);
const isExecutingPlan = ref(false);
const errorMessage = ref<string | null>(null);

const MAX_REFERENCE_IMAGES = 6;

const plan = ref<PlanItem[]>([]);
const batch = ref<ActiveBatch | null>(null);

const isDirty = ref(false);
const showCloseConfirm = ref(false);

let pollInterval: ReturnType<typeof setInterval> | null = null;

// Watchers & Initialization
watch(
    () => props.socialAccounts,
    (accs) => {
        if (!selectedSocialAccountId.value && accs.length > 0) {
            selectedSocialAccountId.value = accs[0].id;
        }
    },
    { immediate: true },
);

watch(
    () => props.activeBatch,
    (newBatch) => {
        if (newBatch && props.modelValue) {
            batch.value = newBatch;
            if (['pending', 'generating'].includes(newBatch.status)) {
                startPolling(newBatch.id);
            }
        }
    },
    { immediate: true },
);

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen && props.activeBatch) {
            batch.value = props.activeBatch;
            if (['pending', 'generating'].includes(props.activeBatch.status)) {
                startPolling(props.activeBatch.id);
            }
        }
        if (!isOpen) {
            stopPolling();
        }
    },
);

onUnmounted(() => {
    stopPolling();
});

const getCsrfToken = (): string => {
    return ((page.props as Record<string, unknown>).csrf_token as string) || '';
};

// Handlers
const handleRequestClose = (targetVal: boolean) => {
    if (!targetVal) {
        if (isDirty.value && plan.value.length > 0 && !batch.value) {
            showCloseConfirm.value = true;
        } else {
            confirmClose();
        }
    }
};

const confirmClose = () => {
    showCloseConfirm.value = false;
    stopPolling();
    emit('update:modelValue', false);
};

const resetState = () => {
    plan.value = [];
    batch.value = null;
    isDirty.value = false;
    errorMessage.value = null;
    referenceImages.value = [];
    stopPolling();
};

interface ReferenceImageItem {
    id?: string;
    path: string;
    url: string;
    uploading?: boolean;
}

const referenceImages = ref<ReferenceImageItem[]>([]);

const handleReferenceImageUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;

    const remainingSlots = MAX_REFERENCE_IMAGES - referenceImages.value.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    for (const file of filesToProcess) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 10 * 1024 * 1024) continue;

        const tempUrl = URL.createObjectURL(file);
        const item = reactive<ReferenceImageItem>({
            path: '',
            url: tempUrl,
            uploading: true,
        });
        referenceImages.value.push(item);

        try {
            const formData = new FormData();
            formData.append('media', file);
            formData.append('collection', 'assets');

            const response = await fetch('/assets', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            const media = result.data || result;
            item.id = media.id;
            item.path = media.path;
            item.url = media.url || tempUrl;
            item.uploading = false;
        } catch (err) {
            console.error('Failed to upload reference image:', err);
            const idx = referenceImages.value.indexOf(item);
            if (idx !== -1) {
                referenceImages.value.splice(idx, 1);
            }
        }
    }

    input.value = '';
};

const removeReferenceImage = (index: number) => {
    referenceImages.value.splice(index, 1);
};

const mediaPicker = ref<InstanceType<typeof MediaPickerDialog>>();

const openMediaPicker = () => {
    mediaPicker.value?.open();
};

const handleMediaPickerSelect = (media: Array<{ id: string; path: string; url: string }>) => {
    const remainingSlots = MAX_REFERENCE_IMAGES - referenceImages.value.length;
    const toAdd = media.slice(0, remainingSlots);

    for (const item of toAdd) {
        const alreadyAdded = referenceImages.value.some(
            (img) => img.path === item.path || img.id === item.id,
        );
        if (alreadyAdded) continue;

        referenceImages.value.push({
            id: item.id,
            path: item.path,
            url: item.url,
            uploading: false,
        });
    }
};

const generatePlan = async () => {
    isGeneratingPlan.value = true;
    errorMessage.value = null;

    try {
        const validPaths = referenceImages.value
            .filter((img) => !img.uploading && img.path)
            .map((img) => img.path);

        const response = await fetch(generate.url(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({
                total_posts: props.totalPosts,
                start_date: props.startDate || undefined,
                social_account_id: selectedSocialAccountId.value,
                instruction: instruction.value,
                reference_images:
                    validPaths.length > 0 ? validPaths : undefined,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to generate plan.');
        }

        plan.value = data.posts || [];
        isDirty.value = true;
    } catch (err: unknown) {
        errorMessage.value =
            err instanceof Error
                ? err.message
                : 'An error occurred while generating content plan.';
    } finally {
        isGeneratingPlan.value = false;
    }
};

const executePlan = async () => {
    if (plan.value.length === 0) return;

    isExecutingPlan.value = true;
    errorMessage.value = null;

    try {
        const validPaths = referenceImages.value
            .filter((img) => !img.uploading && img.path)
            .map((img) => img.path);

        const response = await fetch(execute.url(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({
                plan: plan.value,
                social_account_id: selectedSocialAccountId.value,
                reference_images:
                    validPaths.length > 0 ? validPaths : undefined,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to queue posters.');
        }

        batch.value = data.batch;
        isDirty.value = false;
        emit('batch-created', data.batch.id);

        startPolling(data.batch.id);
    } catch (err: unknown) {
        errorMessage.value =
            err instanceof Error
                ? err.message
                : 'An error occurred while queuing poster generation.';
    } finally {
        isExecutingPlan.value = false;
    }
};

const fetchBatchStatus = async (batchId: string) => {
    try {
        const response = await fetch(batchRoute.url({ posterBatch: batchId }), {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        if (!response.ok) return;

        const data = await response.json();
        batch.value = data.batch;

        if (['completed', 'failed'].includes(data.batch.status)) {
            stopPolling();
        }
    } catch {
        // Silently ignore polling network errors
    }
};

const startPolling = (batchId: string) => {
    stopPolling();
    fetchBatchStatus(batchId);
    pollInterval = window.setInterval(() => {
        fetchBatchStatus(batchId);
    }, 3000);
};

const stopPolling = () => {
    if (pollInterval !== null) {
        clearInterval(pollInterval);
        pollInterval = null;
    }
};

const retryItem = async (itemId: string) => {
    try {
        const response = await fetch(retry.url({ posterBatchItem: itemId }), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
        });

        if (response.ok && batch.value) {
            fetchBatchStatus(batch.value.id);
            if (!pollInterval) {
                startPolling(batch.value.id);
            }
        }
    } catch (err) {
        console.error('Failed to retry item', err);
    }
};
</script>

<template>
    <div
        v-if="open"
        class="fixed inset-0 z-50 flex animate-in flex-col bg-background text-foreground duration-200 fade-in-0"
    >
        <!-- Header -->
        <header
            class="flex h-16 shrink-0 items-center justify-between border-b-2 border-foreground/10 bg-card px-6"
        >
            <!-- Left: Select Channel -->
            <div class="flex items-center gap-3">
                <div class="relative">
                    <select
                        v-model="selectedSocialAccountId"
                        class="h-10 appearance-none rounded-xl border-2 border-foreground bg-card py-1.5 pr-10 pl-4 text-sm font-bold shadow-2xs transition-all focus:ring-2 focus:ring-foreground focus:outline-none"
                    >
                        <option :value="null">Select channel</option>
                        <option
                            v-for="account in socialAccounts"
                            :key="account.id"
                            :value="account.id"
                        >
                            {{ account.display_name }} ({{ account.platform }})
                        </option>
                    </select>
                    <IconChevronDown
                        class="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground/70"
                    />
                </div>
            </div>

            <!-- Right: Close button matching wireframe font style -->
            <button
                type="button"
                class="flex items-center gap-1.5 text-lg font-black tracking-tight text-foreground transition-opacity hover:opacity-75"
                @click="handleRequestClose(false)"
            >
                <span>close</span>
                <IconX class="size-6 stroke-[3]" />
            </button>
        </header>

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto p-6 md:p-10">
            <!-- Error Banner -->
            <div
                v-if="errorMessage"
                class="mb-6 flex items-center justify-between rounded-xl border-2 border-rose-500 bg-rose-50 p-4 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
            >
                <div class="flex items-center gap-3">
                    <IconAlertCircle class="size-5 shrink-0" />
                    <p class="text-sm font-medium">{{ errorMessage }}</p>
                </div>
                <button type="button" @click="errorMessage = null">
                    <IconX class="size-4" />
                </button>
            </div>

            <!-- Grid Container -->
            <div class="mx-auto max-w-7xl">
                <!-- State 1: Before Plan (Empty Skeletons preview) -->
                <div
                    v-if="plan.length === 0 && !isGeneratingPlan && !batch"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
                >
                    <div
                        v-for="i in props.totalPosts"
                        :key="i"
                        class="flex flex-col rounded-2xl border-2 border-foreground/10 bg-card p-4 opacity-75 shadow-2xs"
                    >
                        <div
                            class="mb-3 h-32 w-full animate-pulse rounded-xl bg-foreground/10"
                        ></div>
                        <div class="space-y-2">
                            <div
                                class="h-3.5 w-3/4 animate-pulse rounded bg-foreground/10"
                            ></div>
                            <div
                                class="h-3 w-full animate-pulse rounded bg-foreground/10"
                            ></div>
                            <div
                                class="h-3 w-1/2 animate-pulse rounded bg-foreground/10"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- State 2: Generating Plan Skeletons -->
                <div
                    v-else-if="isGeneratingPlan"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
                >
                    <div
                        v-for="i in props.totalPosts"
                        :key="i"
                        class="flex flex-col rounded-2xl border-2 border-foreground bg-card p-4 shadow-2xs transition-all"
                    >
                        <Skeleton class="mb-3 h-32 w-full rounded-xl" />
                        <div class="space-y-2">
                            <Skeleton class="h-4 w-3/4" />
                            <Skeleton class="h-3 w-full" />
                            <Skeleton class="h-3 w-1/2" />
                        </div>
                    </div>
                </div>

                <!-- State 3: Plan Generated (Pre-generation Cards) -->
                <div
                    v-else-if="plan.length > 0 && !batch"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
                >
                    <div
                        v-for="(item, index) in plan"
                        :key="index"
                        class="flex flex-col justify-between rounded-2xl border-2 border-foreground bg-card p-4 shadow-2xs transition-shadow hover:shadow-md"
                    >
                        <div>
                            <!-- Header / Date -->
                            <div
                                class="mb-3 flex items-center justify-between border-b-2 border-foreground/10 pb-2"
                            >
                                <span
                                    class="text-xs font-bold tracking-wider text-foreground/70 uppercase"
                                >
                                    Day {{ index + 1 }}
                                </span>
                                <span
                                    class="text-xs font-semibold text-foreground/60"
                                >
                                    {{ item.scheduled_date }}
                                </span>
                            </div>

                            <!-- Image placeholder prompt area -->
                            <div
                                class="mb-3 flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-foreground/20 bg-muted/40 p-3 text-center"
                            >
                                <IconSparkles
                                    class="mb-1 size-5 text-foreground/40"
                                />
                                <p
                                    class="line-clamp-3 text-[11px] leading-tight font-medium text-foreground/70"
                                >
                                    "{{ item.post_visual_prompt }}"
                                </p>
                            </div>

                            <!-- Description -->
                            <p
                                class="mb-2 line-clamp-3 text-xs font-medium text-foreground"
                            >
                                {{ item.post_description }}
                            </p>
                        </div>

                        <!-- Hashtags -->
                        <p
                            class="mt-2 line-clamp-1 text-[11px] font-bold text-violet-600 dark:text-violet-400"
                        >
                            {{ item.post_hashtags }}
                        </p>
                    </div>
                </div>

                <!-- State 4: Batch Active / Poster Generation Progress Cards -->
                <div
                    v-else-if="batch && batch.items"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
                >
                    <div
                        v-for="(item, index) in batch.items"
                        :key="item.id || index"
                        class="flex flex-col justify-between rounded-2xl border-2 border-foreground bg-card p-4 shadow-2xs transition-all"
                        :class="{
                            'border-emerald-500 bg-emerald-500/5':
                                item.status === 'completed',
                            'border-rose-500 bg-rose-500/5':
                                item.status === 'failed',
                            'border-violet-500 bg-violet-500/5':
                                item.status === 'processing',
                        }"
                    >
                        <div>
                            <!-- Header / Status -->
                            <div
                                class="mb-3 flex items-center justify-between border-b-2 border-foreground/10 pb-2"
                            >
                                <span
                                    class="text-xs font-bold tracking-wider text-foreground/70 uppercase"
                                >
                                    Day {{ index + 1 }}
                                </span>
                                <span
                                    class="inline-flex items-center gap-1 text-xs font-bold"
                                    :class="{
                                        'text-emerald-600':
                                            item.status === 'completed',
                                        'text-rose-600':
                                            item.status === 'failed',
                                        'text-violet-600':
                                            item.status === 'processing',
                                        'text-foreground/50':
                                            item.status === 'pending',
                                    }"
                                >
                                    <IconCheck
                                        v-if="item.status === 'completed'"
                                        class="size-3.5"
                                    />
                                    <Spinner
                                        v-else-if="item.status === 'processing'"
                                        class="size-3.5"
                                    />
                                    <span class="capitalize">{{
                                        item.status
                                    }}</span>
                                </span>
                            </div>

                            <!-- Image Container -->
                            <div
                                class="relative mb-3 h-32 w-full overflow-hidden rounded-xl border-2 border-foreground/20 bg-muted"
                            >
                                <img
                                    v-if="item.image_url"
                                    :src="item.image_url"
                                    alt="Generated Poster"
                                    class="size-full object-cover"
                                />
                                <div
                                    v-else-if="item.status === 'processing'"
                                    class="flex size-full flex-col items-center justify-center gap-2 bg-violet-500/10 p-2"
                                >
                                    <Spinner class="size-6 text-violet-600" />
                                    <span
                                        class="text-[10px] font-bold text-violet-600"
                                        >Creating poster...</span
                                    >
                                </div>
                                <div
                                    v-else-if="item.status === 'failed'"
                                    class="flex size-full flex-col items-center justify-center gap-1.5 bg-rose-500/10 p-2 text-center"
                                >
                                    <IconAlertCircle
                                        class="size-6 text-rose-600"
                                    />
                                    <span
                                        class="line-clamp-2 text-[10px] font-medium text-rose-600"
                                    >
                                        {{ item.error || 'Failed' }}
                                    </span>
                                </div>
                                <div
                                    v-else
                                    class="flex size-full items-center justify-center p-2 text-center text-foreground/40"
                                >
                                    <IconSparkles class="size-6 opacity-40" />
                                </div>
                            </div>

                            <!-- Description -->
                            <p
                                class="mb-2 line-clamp-2 text-xs font-medium text-foreground"
                            >
                                {{ item.plan_data?.post_description }}
                            </p>
                        </div>

                        <!-- Card Footer / Retry -->
                        <div
                            class="mt-2 flex items-center justify-between border-t border-foreground/10 pt-2"
                        >
                            <span
                                class="truncate text-[11px] font-bold text-violet-600 dark:text-violet-400"
                            >
                                {{ item.plan_data?.post_hashtags }}
                            </span>
                            <Button
                                v-if="item.status === 'failed'"
                                size="sm"
                                variant="outline"
                                class="shrink-0 gap-1 rounded-lg border-2 border-rose-500 text-rose-600 hover:bg-rose-50"
                                @click="retryItem(item.id)"
                            >
                                <IconRefresh class="size-3" />
                                Retry
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Floating Bottom Control Bar matching UI reference -->
        <footer class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div
                class="flex items-center gap-3 rounded-2xl border-2 border-foreground bg-card p-2 shadow-xl"
            >
                <!-- Instruction Button -->
                <button
                    type="button"
                    class="flex items-center gap-2 rounded-xl border-2 border-foreground/20 bg-muted/60 px-4 py-2 text-xs font-bold text-foreground transition-all hover:bg-muted"
                    @click="showInstructionModal = true"
                >
                    <IconSettings class="size-4" />
                    <span>Instruction</span>
                    <span
                        v-if="instruction.trim() || referenceImages.length > 0"
                        class="size-2 rounded-full bg-violet-600"
                    ></span>
                </button>

                <!-- Action Button: Generate Plan OR Generate Posters -->
                <button
                    v-if="plan.length === 0 && !batch"
                    type="button"
                    :disabled="isGeneratingPlan"
                    class="flex items-center gap-2 rounded-xl border-2 border-foreground bg-foreground px-5 py-2 text-xs font-black text-background transition-all hover:opacity-90 disabled:opacity-50"
                    @click="generatePlan"
                >
                    <Spinner
                        v-if="isGeneratingPlan"
                        class="size-4 text-background"
                    />
                    <IconSparkles v-else class="size-4" />
                    <span>Generate plan</span>
                </button>

                <button
                    v-else-if="plan.length > 0 && !batch"
                    type="button"
                    :disabled="isExecutingPlan"
                    class="flex items-center gap-2 rounded-xl border-2 border-foreground bg-emerald-600 px-5 py-2 text-xs font-black text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
                    @click="executePlan"
                >
                    <Spinner v-if="isExecutingPlan" class="size-4 text-white" />
                    <IconSparkles v-else class="size-4" />
                    <span>Generate posters</span>
                </button>

                <div
                    v-else-if="batch"
                    class="flex items-center gap-3 px-4 py-1.5 text-xs font-bold"
                >
                    <span class="flex items-center gap-1.5">
                        <Spinner
                            v-if="batch.status === 'generating'"
                            class="size-4 text-violet-600"
                        />
                        <IconCheck
                            v-else-if="batch.status === 'completed'"
                            class="size-4 text-emerald-600"
                        />
                        <span
                            >{{ batch.completed_items }}/{{
                                batch.total_items
                            }}
                            Completed</span
                        >
                    </span>
                    <button
                        type="button"
                        class="rounded-lg border border-foreground/20 px-2.5 py-1 text-[11px] font-bold transition-all hover:bg-muted"
                        @click="resetState"
                    >
                        New Plan
                    </button>
                </div>
            </div>
        </footer>

        <!-- Custom Instruction Modal -->
        <Dialog v-model:open="showInstructionModal">
            <DialogContent class="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Content Plan Instructions</DialogTitle>
                    <DialogDescription>
                        Provide guidance or focus areas for the AI (e.g. "Focus
                        on product launch", "Black Friday promo").
                    </DialogDescription>
                </DialogHeader>

                <div class="space-y-3 py-2">
                    <Textarea
                        v-model="instruction"
                        placeholder="Enter custom instructions or themes for this post series..."
                        rows="4"
                    />

                    <div class="space-y-2">
                        <Label>Reference images</Label>
                        <p class="text-xs text-muted-foreground">
                            Upload up to 6 images or browse your media library
                            as visual reference for the poster generation.
                        </p>

                        <div
                            v-if="referenceImages.length > 0"
                            class="flex flex-wrap gap-3"
                        >
                            <div
                                v-for="(image, index) in referenceImages"
                                :key="index"
                                class="group relative size-24 overflow-hidden rounded-lg border-2 border-foreground/10"
                            >
                                <img
                                    :src="image.url"
                                    :alt="`Reference ${index + 1}`"
                                    class="size-full object-cover"
                                    :class="{ 'opacity-50': image.uploading }"
                                />
                                <div
                                    v-if="image.uploading"
                                    class="absolute inset-0 flex items-center justify-center bg-black/40"
                                >
                                    <Spinner class="size-5 text-white" />
                                </div>
                                <button
                                    type="button"
                                    class="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    @click="removeReferenceImage(index)"
                                >
                                    <IconX class="size-3" />
                                </button>
                            </div>
                        </div>

                        <div
                            v-if="referenceImages.length < MAX_REFERENCE_IMAGES"
                            class="flex gap-2"
                        >
                            <label
                                class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-foreground/20 bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                            >
                                <IconPhoto class="size-6 text-foreground/40" />
                                <span
                                    class="text-[11px] font-medium text-foreground/60"
                                >
                                    Upload
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    class="hidden"
                                    @change="handleReferenceImageUpload"
                                />
                            </label>
                            <button
                                type="button"
                                class="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-violet-300 bg-violet-50/30 p-3 transition-colors hover:bg-violet-50 dark:border-violet-700 dark:bg-violet-950/30 dark:hover:bg-violet-950/50"
                                @click="openMediaPicker"
                            >
                                <IconFiles class="size-6 text-violet-500" />
                                <span
                                    class="text-[11px] font-medium text-violet-600 dark:text-violet-400"
                                >
                                    Browse media
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button @click="showInstructionModal = false">Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Unsaved Changes Confirmation Modal -->
        <Dialog v-model:open="showCloseConfirm">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Unsaved Content Plan</DialogTitle>
                    <DialogDescription>
                        You have a generated post plan that hasn't been turned
                        into posters yet. Closing will lose this plan.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter class="gap-2">
                    <Button variant="outline" @click="showCloseConfirm = false"
                        >Cancel</Button
                    >
                    <Button variant="destructive" @click="confirmClose"
                        >Discard & Close</Button
                    >
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <MediaPickerDialog ref="mediaPicker" @select="handleMediaPickerSelect" />
    </div>
</template>
