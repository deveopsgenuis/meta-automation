<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import {
    IconAlertCircle,
    IconArrowsSplit,
    IconCheck,
    IconChevronDown,
    IconFiles,
    IconPhoto,
    IconPlayerPlay,
    IconRefresh,
    IconSettings,
    IconSparkles,
    IconVideo,
    IconX,
} from '@tabler/icons-vue';
import { computed, onUnmounted, ref, watch } from 'vue';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import MediaPickerDialog from '@/components/posts/MediaPickerDialog.vue';

interface SocialAccount {
    id: string;
    platform: string;
    display_name: string;
    username?: string | null;
    avatar_url?: string | null;
    is_active?: boolean;
}

interface PlanItem {
    video_description: string;
    video_prompt: string;
    scheduled_date: string;
    scheduled_time: string;
    post_hashtags: string;
}

interface BatchItemData {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    post_id?: string | null;
    video_url?: string | null;
    error?: string | null;
    plan_data: PlanItem;
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
    startDate?: string;
    socialAccounts?: SocialAccount[];
    activeBatch?: ActiveBatch | null;
}

const props = withDefaults(defineProps<Props>(), {
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
const selectedSocialAccountId = ref<string | null>(props.socialAccounts[0]?.id ?? null);
const instruction = ref('');
const showInstructionModal = ref(false);
const showSettingsModal = ref(false);
const isGeneratingPlan = ref(false);
const isExecutingPlan = ref(false);
const errorMessage = ref<string | null>(null);

const selectedSize = ref('9:16');
const selectedQuality = ref('720p');
const totalVideos = ref(3);

interface FrameImage {
    path: string;
    url: string;
}

const startFrameImage = ref<FrameImage | null>(null);
const endFrameImage = ref<FrameImage | null>(null);
const startFramePicker = ref<InstanceType<typeof MediaPickerDialog>>();
const endFramePicker = ref<InstanceType<typeof MediaPickerDialog>>();

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
    startFrameImage.value = null;
    endFrameImage.value = null;
    stopPolling();
};

const handleStartFrameSelect = (media: Array<{ path: string; url: string }>) => {
    if (media.length > 0) {
        startFrameImage.value = { path: media[0].path, url: media[0].url };
    }
};

const handleEndFrameSelect = (media: Array<{ path: string; url: string }>) => {
    if (media.length > 0) {
        endFrameImage.value = { path: media[0].path, url: media[0].url };
    }
};

const removeStartFrame = () => {
    startFrameImage.value = null;
};

const removeEndFrame = () => {
    endFrameImage.value = null;
};

const generatePlan = async () => {
    isGeneratingPlan.value = true;
    errorMessage.value = null;

    try {
        const response = await fetch('/posts/ai/video/plan/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({
                total_videos: totalVideos.value,
                start_date: props.startDate || undefined,
                social_account_id: selectedSocialAccountId.value,
                instruction: instruction.value,
                size: selectedSize.value,
                quality: selectedQuality.value,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to generate video plan.');
        }

        plan.value = data.videos || [];
        isDirty.value = true;
    } catch (err: unknown) {
        errorMessage.value = err instanceof Error ? err.message : 'An error occurred while generating video plan.';
    } finally {
        isGeneratingPlan.value = false;
    }
};

const executePlan = async () => {
    if (plan.value.length === 0) return;

    isExecutingPlan.value = true;
    errorMessage.value = null;

    try {
        const response = await fetch('/posts/ai/video/plan/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': getCsrfToken(),
            },
            body: JSON.stringify({
                plan: plan.value,
                social_account_id: selectedSocialAccountId.value,
                size: selectedSize.value,
                quality: selectedQuality.value,
                start_frame_image: startFrameImage.value ?? undefined,
                end_frame_image: endFrameImage.value ?? undefined,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to queue videos.');
        }

        batch.value = data.batch;
        isDirty.value = false;
        emit('batch-created', data.batch.id);

        startPolling(data.batch.id);
    } catch (err: unknown) {
        errorMessage.value = err instanceof Error ? err.message : 'An error occurred while queuing video generation.';
    } finally {
        isExecutingPlan.value = false;
    }
};

const fetchBatchStatus = async (batchId: string) => {
    try {
        const response = await fetch(`/posts/ai/video/plan/batch/${batchId}`, {
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
    pollInterval = setInterval(() => {
        fetchBatchStatus(batchId);
    }, 3000);
};

const stopPolling = () => {
    if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
    }
};

const retryItem = async (itemId: string) => {
    try {
        const response = await fetch(`/posts/ai/video/plan/batch/${itemId}/retry`, {
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
        class="fixed inset-0 z-50 flex flex-col bg-background text-foreground animate-in fade-in-0 duration-200"
    >
        <!-- Header -->
        <header class="flex h-16 shrink-0 items-center justify-between border-b-2 border-foreground/10 px-6 bg-card">
            <!-- Left: Select Channel -->
            <div class="flex items-center gap-3">
                <div class="relative">
                    <select
                        v-model="selectedSocialAccountId"
                        class="h-10 appearance-none rounded-xl border-2 border-foreground bg-card py-1.5 pl-4 pr-10 text-sm font-bold shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-foreground"
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
                    <IconChevronDown class="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/70" />
                </div>
            </div>

            <!-- Right: Close button -->
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
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                >
                    <div
                        v-for="i in totalVideos"
                        :key="i"
                        class="flex flex-col rounded-2xl border-2 border-foreground/10 bg-card p-4 shadow-2xs opacity-75"
                    >
                        <div class="mb-3 h-40 w-full rounded-xl bg-foreground/10 animate-pulse"></div>
                        <div class="space-y-2">
                            <div class="h-3.5 w-3/4 rounded bg-foreground/10 animate-pulse"></div>
                            <div class="h-3 w-full rounded bg-foreground/10 animate-pulse"></div>
                            <div class="h-3 w-1/2 rounded bg-foreground/10 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                <!-- State 2: Generating Plan Skeletons -->
                <div
                    v-else-if="isGeneratingPlan"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                >
                    <div
                        v-for="i in totalVideos"
                        :key="i"
                        class="flex flex-col rounded-2xl border-2 border-foreground bg-card p-4 shadow-2xs transition-all"
                    >
                        <Skeleton class="mb-3 h-40 w-full rounded-xl" />
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
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                >
                    <div
                        v-for="(item, index) in plan"
                        :key="index"
                        class="flex flex-col justify-between rounded-2xl border-2 border-foreground bg-card p-4 shadow-2xs hover:shadow-md transition-shadow"
                    >
                        <div>
                            <!-- Header / Date -->
                            <div class="mb-3 flex items-center justify-between border-b-2 border-foreground/10 pb-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-foreground/70">
                                    Video {{ index + 1 }}
                                </span>
                                <span class="text-xs font-semibold text-foreground/60">
                                    {{ item.scheduled_date }} {{ item.scheduled_time }}
                                </span>
                            </div>

                            <!-- Video prompt area -->
                            <div class="mb-3 flex h-40 flex-col justify-center items-center rounded-xl border-2 border-dashed border-foreground/20 bg-muted/40 p-3 text-center">
                                <IconVideo class="mb-1 size-6 text-foreground/40" />
                                <p class="line-clamp-4 text-[11px] font-medium text-foreground/70 leading-tight">
                                    "{{ item.video_prompt }}"
                                </p>
                            </div>

                            <!-- Description -->
                            <p class="mb-2 line-clamp-2 text-xs font-medium text-foreground">
                                {{ item.video_description }}
                            </p>
                        </div>

                        <!-- Hashtags -->
                        <p class="mt-2 line-clamp-1 text-[11px] font-bold text-violet-600 dark:text-violet-400">
                            {{ item.post_hashtags }}
                        </p>
                    </div>
                </div>

                <!-- State 4: Batch Active / Video Generation Progress Cards -->
                <div
                    v-else-if="batch && batch.items"
                    class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                >
                    <div
                        v-for="(item, index) in batch.items"
                        :key="item.id || index"
                        class="flex flex-col justify-between rounded-2xl border-2 border-foreground bg-card p-4 shadow-2xs transition-all"
                        :class="{
                            'border-emerald-500 bg-emerald-500/5': item.status === 'completed',
                            'border-rose-500 bg-rose-500/5': item.status === 'failed',
                            'border-violet-500 bg-violet-500/5': item.status === 'processing',
                        }"
                    >
                        <div>
                            <!-- Header / Status -->
                            <div class="mb-3 flex items-center justify-between border-b-2 border-foreground/10 pb-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-foreground/70">
                                    Video {{ index + 1 }}
                                </span>
                                <span
                                    class="inline-flex items-center gap-1 text-xs font-bold"
                                    :class="{
                                        'text-emerald-600': item.status === 'completed',
                                        'text-rose-600': item.status === 'failed',
                                        'text-violet-600': item.status === 'processing',
                                        'text-foreground/50': item.status === 'pending',
                                    }"
                                >
                                    <IconCheck v-if="item.status === 'completed'" class="size-3.5" />
                                    <Spinner v-else-if="item.status === 'processing'" class="size-3.5" />
                                    <span class="capitalize">{{ item.status }}</span>
                                </span>
                            </div>

                            <!-- Video Container -->
                            <div class="relative mb-3 h-40 w-full overflow-hidden rounded-xl border-2 border-foreground/20 bg-muted">
                                <video
                                    v-if="item.video_url"
                                    :src="item.video_url"
                                    class="size-full object-cover"
                                    controls
                                    preload="metadata"
                                />
                                <div
                                    v-else-if="item.status === 'processing'"
                                    class="flex size-full flex-col items-center justify-center gap-2 p-2 bg-violet-500/10"
                                >
                                    <Spinner class="size-6 text-violet-600" />
                                    <span class="text-[10px] font-bold text-violet-600">Generating video...</span>
                                </div>
                                <div
                                    v-else-if="item.status === 'failed'"
                                    class="flex size-full flex-col items-center justify-center gap-1.5 p-2 bg-rose-500/10 text-center"
                                >
                                    <IconAlertCircle class="size-6 text-rose-600" />
                                    <span class="text-[10px] font-medium text-rose-600 line-clamp-2">
                                        {{ item.error || 'Failed' }}
                                    </span>
                                </div>
                                <div
                                    v-else
                                    class="flex size-full items-center justify-center p-2 text-center text-foreground/40"
                                >
                                    <IconPlayerPlay class="size-8 opacity-40" />
                                </div>
                            </div>

                            <!-- Description -->
                            <p class="mb-2 line-clamp-2 text-xs font-medium text-foreground">
                                {{ item.plan_data?.video_description }}
                            </p>
                        </div>

                        <!-- Card Footer / Retry -->
                        <div class="mt-2 flex items-center justify-between border-t border-foreground/10 pt-2">
                            <span class="text-[11px] font-bold text-violet-600 dark:text-violet-400 truncate">
                                {{ item.plan_data?.post_hashtags }}
                            </span>
                            <Button
                                v-if="item.status === 'failed'"
                                size="xs"
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

        <!-- Floating Bottom Control Bar -->
        <footer class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div class="flex items-center gap-3 rounded-2xl border-2 border-foreground bg-card p-2 shadow-xl">
                <!-- Settings Button -->
                <button
                    type="button"
                    class="flex items-center gap-2 rounded-xl border-2 border-foreground/20 bg-muted/60 px-4 py-2 text-xs font-bold text-foreground transition-all hover:bg-muted"
                    @click="showSettingsModal = true"
                >
                    <IconSettings class="size-4" />
                    <span>Settings</span>
                </button>

                <!-- Instruction Button -->
                <button
                    type="button"
                    class="flex items-center gap-2 rounded-xl border-2 border-foreground/20 bg-muted/60 px-4 py-2 text-xs font-bold text-foreground transition-all hover:bg-muted"
                    @click="showInstructionModal = true"
                >
                    <IconSparkles class="size-4" />
                    <span>Instruction</span>
                    <span v-if="instruction.trim() || startFrameImage || endFrameImage" class="size-2 rounded-full bg-violet-600"></span>
                </button>

                <!-- Action Button: Generate Plan OR Generate Videos -->
                <button
                    v-if="plan.length === 0 && !batch"
                    type="button"
                    :disabled="isGeneratingPlan"
                    class="flex items-center gap-2 rounded-xl border-2 border-foreground bg-foreground px-5 py-2 text-xs font-black text-background transition-all hover:opacity-90 disabled:opacity-50"
                    @click="generatePlan"
                >
                    <Spinner v-if="isGeneratingPlan" class="size-4 text-background" />
                    <IconSparkles v-else class="size-4" />
                    <span>Generate video plan</span>
                </button>

                <button
                    v-else-if="plan.length > 0 && !batch"
                    type="button"
                    :disabled="isExecutingPlan"
                    class="flex items-center gap-2 rounded-xl border-2 border-foreground bg-emerald-600 px-5 py-2 text-xs font-black text-white transition-all hover:bg-emerald-700 disabled:opacity-50"
                    @click="executePlan"
                >
                    <Spinner v-if="isExecutingPlan" class="size-4 text-white" />
                    <IconVideo v-else class="size-4" />
                    <span>Generate videos</span>
                </button>

                <div
                    v-else-if="batch"
                    class="flex items-center gap-3 px-4 py-1.5 text-xs font-bold"
                >
                    <span class="flex items-center gap-1.5">
                        <Spinner v-if="batch.status === 'generating'" class="size-4 text-violet-600" />
                        <IconCheck v-else-if="batch.status === 'completed'" class="size-4 text-emerald-600" />
                        <span>{{ batch.completed_items }}/{{ batch.total_items }} Completed</span>
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

        <!-- Settings Modal -->
        <Dialog v-model:open="showSettingsModal">
            <DialogContent class="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Video Settings</DialogTitle>
                    <DialogDescription>
                        Configure video size and quality for this batch.
                    </DialogDescription>
                </DialogHeader>

                <div class="space-y-4 py-2">
                    <div class="space-y-2">
                        <label class="text-sm font-bold">Number of Videos</label>
                        <div class="flex gap-2">
                            <button
                                v-for="n in 10"
                                :key="n"
                                type="button"
                                class="size-10 rounded-xl border-2 text-xs font-bold transition-all"
                                :class="totalVideos === n
                                    ? 'border-foreground bg-foreground text-background'
                                    : 'border-foreground/20 bg-muted text-foreground hover:border-foreground/40'"
                                @click="totalVideos = n"
                            >
                                {{ n }}
                            </button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold">Video Size</label>
                        <div class="flex gap-2">
                            <button
                                v-for="sizeOption in [
                                    { value: '9:16', label: '9:16 Story/Reel' },
                                    { value: '1:1', label: '1:1 Square' },
                                    { value: '16:9', label: '16:9 Landscape' },
                                ]"
                                :key="sizeOption.value"
                                type="button"
                                class="rounded-xl border-2 px-4 py-2 text-xs font-bold transition-all"
                                :class="selectedSize === sizeOption.value
                                    ? 'border-foreground bg-foreground text-background'
                                    : 'border-foreground/20 bg-muted text-foreground hover:border-foreground/40'"
                                @click="selectedSize = sizeOption.value"
                            >
                                {{ sizeOption.label }}
                            </button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-bold">Video Quality</label>
                        <div class="flex gap-2">
                            <button
                                v-for="qualityOption in [
                                    { value: '720p', label: '720p' },
                                    { value: '1080p', label: '1080p' },
                                ]"
                                :key="qualityOption.value"
                                type="button"
                                class="rounded-xl border-2 px-4 py-2 text-xs font-bold transition-all"
                                :class="selectedQuality === qualityOption.value
                                    ? 'border-foreground bg-foreground text-background'
                                    : 'border-foreground/20 bg-muted text-foreground hover:border-foreground/40'"
                                @click="selectedQuality = qualityOption.value"
                            >
                                {{ qualityOption.label }}
                            </button>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button @click="showSettingsModal = false">Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Custom Instruction Modal -->
        <Dialog v-model:open="showInstructionModal">
            <DialogContent class="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Video Plan Instructions</DialogTitle>
                    <DialogDescription>
                        Provide guidance or focus areas for the AI (e.g. "Focus on product launch", "Black Friday promo").
                    </DialogDescription>
                </DialogHeader>

                <div class="space-y-4 py-2">
                    <Textarea
                        v-model="instruction"
                        placeholder="Enter custom instructions or themes for this video series..."
                        rows="4"
                    />

                    <!-- Start / End Frame Images -->
                    <div class="space-y-3">
                        <Label class="flex items-center gap-2">
                            <IconArrowsSplit class="size-4" />
                            Start / End Frame Images
                        </Label>
                        <p class="text-xs text-muted-foreground">
                            Optionally provide a start frame and/or end frame image to guide the video generation.
                        </p>

                        <div class="grid grid-cols-2 gap-3">
                            <!-- Start Frame -->
                            <div class="space-y-1.5">
                                <span class="text-[11px] font-bold uppercase tracking-wider text-foreground/60">Start Frame</span>
                                <div
                                    v-if="startFrameImage"
                                    class="group relative size-28 overflow-hidden rounded-lg border-2 border-foreground/10"
                                >
                                    <img
                                        :src="startFrameImage.url"
                                        alt="Start frame"
                                        class="size-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        class="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        @click="removeStartFrame"
                                    >
                                        <IconX class="size-3" />
                                    </button>
                                </div>
                                <div
                                    v-else
                                    class="flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-foreground/20 bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                                >
                                    <button
                                        type="button"
                                        class="flex flex-col items-center gap-1"
                                        @click="startFramePicker?.open()"
                                    >
                                        <IconPhoto class="size-5 text-foreground/40" />
                                        <span class="text-[10px] font-medium text-foreground/60">Select image</span>
                                    </button>
                                </div>
                            </div>

                            <!-- End Frame -->
                            <div class="space-y-1.5">
                                <span class="text-[11px] font-bold uppercase tracking-wider text-foreground/60">End Frame</span>
                                <div
                                    v-if="endFrameImage"
                                    class="group relative size-28 overflow-hidden rounded-lg border-2 border-foreground/10"
                                >
                                    <img
                                        :src="endFrameImage.url"
                                        alt="End frame"
                                        class="size-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        class="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        @click="removeEndFrame"
                                    >
                                        <IconX class="size-3" />
                                    </button>
                                </div>
                                <div
                                    v-else
                                    class="flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-foreground/20 bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                                >
                                    <button
                                        type="button"
                                        class="flex flex-col items-center gap-1"
                                        @click="endFramePicker?.open()"
                                    >
                                        <IconPhoto class="size-5 text-foreground/40" />
                                        <span class="text-[10px] font-medium text-foreground/60">Select image</span>
                                    </button>
                                </div>
                            </div>
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
                    <DialogTitle>Unsaved Video Plan</DialogTitle>
                    <DialogDescription>
                        You have a generated video plan that hasn't been turned into videos yet. Closing will lose this plan.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter class="gap-2">
                    <Button variant="outline" @click="showCloseConfirm = false">Cancel</Button>
                    <Button variant="destructive" @click="confirmClose">Discard & Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <MediaPickerDialog ref="startFramePicker" @select="handleStartFrameSelect" />
        <MediaPickerDialog ref="endFramePicker" @select="handleEndFrameSelect" />
    </div>
</template>
