<script setup lang="ts">
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
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { usePage } from '@inertiajs/vue3';
import { IconPhoto, IconX } from '@tabler/icons-vue';
import { computed, reactive, ref, watch } from 'vue';

interface Props {
    modelValue: boolean;
    submitting?: boolean;
    prompt?: string;
    systemPrompt?: string;
    mode?: 'single' | 'bulk';
    referenceImages?: string[];
}

interface ReferenceImageItem {
    id?: string;
    path: string;
    url: string;
    uploading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    submitting: false,
    prompt: '',
    systemPrompt: '',
    mode: 'single',
    referenceImages: () => [],
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    submit: [
        payload: {
            prompt: string;
            systemPrompt: string;
            mode: 'single' | 'bulk';
            referenceImages: string[];
        },
    ];
}>();

const page = usePage();

const getCsrfToken = (): string => {
    return ((page.props as Record<string, unknown>).csrf_token as string) || '';
};

const internalOpen = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value),
});

const promptValue = ref(props.prompt);
const systemPromptValue = ref(props.systemPrompt);
const modeValue = ref<'single' | 'bulk'>(props.mode);
const referenceImages = ref<ReferenceImageItem[]>(
    props.referenceImages.map((path) => ({ path, url: path })),
);

const MAX_IMAGES = 6;

watch(
    () => props.prompt,
    (value) => {
        promptValue.value = value;
    },
);

watch(
    () => props.systemPrompt,
    (value) => {
        systemPromptValue.value = value;
    },
);

watch(
    () => props.mode,
    (value) => {
        modeValue.value = value;
    },
);

watch(
    () => props.referenceImages,
    (value) => {
        referenceImages.value = value.map((path) => ({ path, url: path }));
    },
);

const handleImageUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;

    const remainingSlots = MAX_IMAGES - referenceImages.value.length;
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

const removeImage = (index: number) => {
    referenceImages.value.splice(index, 1);
};

const canAddMore = computed(() => referenceImages.value.length < MAX_IMAGES);

const submit = () => {
    const validPaths = referenceImages.value
        .filter((img) => !img.uploading && img.path)
        .map((img) => img.path);

    emit('submit', {
        prompt: promptValue.value.trim(),
        systemPrompt: systemPromptValue.value.trim(),
        mode: modeValue.value,
        referenceImages: validPaths,
    });
};
</script>

<template>
    <Dialog v-model:open="internalOpen">
        <DialogContent class="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>{{
                    $t('calendar.poster_dialog.title')
                }}</DialogTitle>
                <DialogDescription>{{
                    $t('calendar.poster_dialog.description')
                }}</DialogDescription>
            </DialogHeader>

            <div class="space-y-4">
                <div class="grid gap-2">
                    <Label for="poster-design-prompt">{{
                        $t('calendar.poster_dialog.prompt_label')
                    }}</Label>
                    <Textarea
                        id="poster-design-prompt"
                        v-model="promptValue"
                        :placeholder="
                            $t('calendar.poster_dialog.prompt_placeholder')
                        "
                        rows="4"
                    />
                </div>

                <div class="grid gap-2">
                    <Label for="poster-design-system-prompt">{{
                        $t('calendar.poster_dialog.system_prompt_label')
                    }}</Label>
                    <Textarea
                        id="poster-design-system-prompt"
                        v-model="systemPromptValue"
                        :placeholder="
                            $t(
                                'calendar.poster_dialog.system_prompt_placeholder',
                            )
                        "
                        rows="4"
                    />
                </div>

                <div class="grid gap-2">
                    <Label>{{
                        $t('calendar.poster_dialog.reference_images')
                    }}</Label>
                    <p class="text-xs text-muted-foreground">
                        {{ $t('calendar.poster_dialog.reference_images_hint') }}
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
                                @click="removeImage(index)"
                            >
                                <IconX class="size-3" />
                            </button>
                        </div>
                    </div>

                    <label
                        v-if="canAddMore"
                        class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-foreground/20 bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                    >
                        <IconPhoto class="size-8 text-foreground/40" />
                        <span class="text-xs font-medium text-foreground/60">
                            {{ $t('calendar.poster_dialog.add_images') }} ({{
                                referenceImages.length
                            }}/{{ MAX_IMAGES }})
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            class="hidden"
                            @change="handleImageUpload"
                        />
                    </label>
                </div>

                <div class="grid gap-2">
                    <Label>{{ $t('calendar.poster_dialog.mode_label') }}</Label>
                    <div class="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            :class="
                                modeValue === 'single'
                                    ? 'bg-foreground text-background'
                                    : ''
                            "
                            @click="modeValue = 'single'"
                        >
                            {{ $t('calendar.poster_dialog.single') }}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            :class="
                                modeValue === 'bulk'
                                    ? 'bg-foreground text-background'
                                    : ''
                            "
                            @click="modeValue = 'bulk'"
                        >
                            {{ $t('calendar.poster_dialog.bulk') }}
                        </Button>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button
                    :loading="submitting"
                    :disabled="!promptValue.trim()"
                    @click="submit"
                >
                    {{ $t('calendar.poster_dialog.submit') }}
                </Button>
                <Button
                    variant="outline"
                    @click="emit('update:modelValue', false)"
                >
                    {{ $t('calendar.poster_dialog.cancel') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
