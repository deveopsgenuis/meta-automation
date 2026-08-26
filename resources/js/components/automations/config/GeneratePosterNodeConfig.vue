<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { IconPhoto, IconPlus, IconX, IconZoomIn } from '@tabler/icons-vue';
import { trans } from 'laravel-vue-i18n';
import { computed, ref, watch } from 'vue';

import ChannelConfigurator from '@/components/ChannelConfigurator.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import ImagePreviewDialog from '@/components/ImagePreviewDialog.vue';
import InputError from '@/components/InputError.vue';
import MediaPickerDialog from '@/components/posts/MediaPickerDialog.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useExpandedEditor } from '@/composables/useExpandedEditor';
import type { Channel } from '@/types/channel';
import { Platform } from '@/types/platform';

interface SocialAccount {
    id: string;
    platform: string;
    display_name: string;
    username: string;
    avatar_url: string | null;
}

interface PosterAccount {
    social_account_id: string;
    meta: Record<string, any>;
}

interface ReferenceImage {
    path: string;
    url: string;
}

interface GeneratePosterConfig {
    accounts: PosterAccount[];
    poster_size: string;
    poster_count: number;
    template: string;
    prompt_template: string;
    use_brand_voice: boolean;
    use_brand_visuals: boolean;
    reference_images: string[];
}

const POSTER_SIZES = [
    { value: '1080*1080', label: '1080×1080', description: 'Square', icon: '□' },
    { value: '1080*1350', label: '1080×1350', description: 'Portrait', icon: '▮' },
    { value: '1200*630', label: '1200×630', description: 'Landscape', icon: '▭' },
] as const;

const POSTER_COUNTS = [1, 2, 3, 4, 5, 6] as const;

const REFERENCE_IMAGE_COUNTS = [1, 2, 4] as const;

const props = defineProps<{
    data: Record<string, unknown>;
    errors?: Record<string, string>;
}>();
const emit = defineEmits<{ update: [Record<string, unknown>] }>();

const editorExpanded = useExpandedEditor();

const page = usePage();

const socialAccounts = computed<SocialAccount[]>(() => {
    const raw = page.props.socialAccounts as { data?: SocialAccount[] } | SocialAccount[] | undefined;
    if (!raw) return [];
    return Array.isArray(raw) ? (raw as SocialAccount[]) : ((raw as { data: SocialAccount[] }).data ?? []);
});

const defaultContentTypeFor = (platform: string): string => {
    switch (platform) {
        case Platform.Instagram:
        case Platform.InstagramFacebook:
            return 'instagram_feed';
        case Platform.Facebook:
            return 'facebook_post';
        case Platform.LinkedIn:
            return 'linkedin_post';
        case Platform.LinkedInPage:
            return 'linkedin_page_post';
        case Platform.TikTok:
            return 'tiktok_photo';
        case Platform.Pinterest:
            return 'pinterest_pin';
        case Platform.YouTube:
            return 'youtube_short';
        case Platform.X:
            return 'x_post';
        case Platform.Threads:
            return 'threads_post';
        case Platform.Bluesky:
            return 'bluesky_post';
        case Platform.Mastodon:
            return 'mastodon_post';
        default:
            return '';
    }
};

const accountById = (id: string): SocialAccount | undefined =>
    socialAccounts.value.find((a) => a.id === id);

const normalizeAccountsFromData = (): PosterAccount[] => {
    const incoming = props.data.accounts;
    if (Array.isArray(incoming)) {
        return (incoming as any[]).map((a) => ({
            social_account_id: String(a.social_account_id ?? ''),
            meta: (a.meta as Record<string, any>) ?? {},
        })).filter((a) => a.social_account_id);
    }
    const legacyIds = props.data.social_account_ids;
    if (Array.isArray(legacyIds)) {
        return (legacyIds as string[]).map((id) => ({
            social_account_id: id,
            meta: {},
        }));
    }
    return [];
};

const normalizeReferenceImagesFromData = (): ReferenceImage[] => {
    const incoming = props.data.reference_images;
    if (!Array.isArray(incoming)) return [];
    return (incoming as any[]).map((img) => {
        if (typeof img === 'string') {
            return { path: img, url: img.startsWith('data:') ? img : `/storage/${img}` };
        }
        return { path: img.path ?? '', url: img.url ?? '' };
    }).filter((img) => img.path);
};

const local = ref<GeneratePosterConfig>({
    accounts: normalizeAccountsFromData(),
    poster_size: (props.data.poster_size as string) ?? '1080*1080',
    poster_count: (props.data.poster_count as number) ?? 1,
    template: (props.data.template as string) ?? 'single',
    prompt_template: (props.data.prompt_template as string) ?? '',
    use_brand_voice: (props.data.use_brand_voice as boolean) ?? true,
    use_brand_visuals: (props.data.use_brand_visuals as boolean) ?? true,
    reference_images: (props.data.reference_images as string[]) ?? [],
});

const referenceImages = ref<ReferenceImage[]>(normalizeReferenceImagesFromData());
const referenceImagePicker = ref<InstanceType<typeof MediaPickerDialog>>();
const imagePreview = ref<InstanceType<typeof ImagePreviewDialog>>();
const activePickerIndex = ref<number>(-1);

watch(local, (val) => emit('update', val), { deep: true });

const selectedAccountIds = computed(() => local.value.accounts.map((a) => a.social_account_id));

const referenceImageCount = computed(() => referenceImages.value.length);

const onToggleAccount = (accountId: string) => {
    const account = accountById(accountId);
    if (account) toggleAccount(account);
};

const toggleAccount = (account: SocialAccount) => {
    if (selectedAccountIds.value.includes(account.id)) {
        local.value.accounts = local.value.accounts.filter((a) => a.social_account_id !== account.id);
        return;
    }
    local.value.accounts = [
        ...local.value.accounts,
        {
            social_account_id: account.id,
            meta: {},
        },
    ];
};

const updateMeta = (accountId: string, value: Record<string, any>) => {
    const idx = local.value.accounts.findIndex((a) => a.social_account_id === accountId);
    if (idx === -1) return;
    local.value.accounts[idx] = { ...local.value.accounts[idx], meta: value };
};

const openReferenceImagePicker = (index: number) => {
    activePickerIndex.value = index;
    referenceImagePicker.value?.open();
};

const handleReferenceImageSelect = (media: Array<{ path: string; url: string }>) => {
    if (media.length === 0) return;

    const picked = media[0];
    const idx = activePickerIndex.value;
    const newImage: ReferenceImage = {
        path: picked.path,
        url: picked.url || `/storage/${picked.path}`,
    };

    if (idx >= 0 && idx < referenceImages.value.length) {
        referenceImages.value[idx] = newImage;
    } else {
        referenceImages.value.push(newImage);
    }

    local.value.reference_images = referenceImages.value.filter((img) => img.path).map((img) => img.path);
};

const removeReferenceImage = (index: number) => {
    referenceImages.value.splice(index, 1);
    local.value.reference_images = referenceImages.value.map((img) => img.path);
};

const previewReferenceImage = (index: number) => {
    const image = referenceImages.value[index];
    if (image?.url) {
        imagePreview.value?.open(image.url);
    }
};

const setReferenceImageCount = (count: number) => {
    while (referenceImages.value.length < count) {
        referenceImages.value.push({ path: '', url: '' });
    }
    if (referenceImages.value.length > count) {
        referenceImages.value = referenceImages.value.slice(0, count);
    }
    local.value.reference_images = referenceImages.value.filter((img) => img.path).map((img) => img.path);
};

const channels = computed<Channel[]>(() =>
    socialAccounts.value.map((account) => {
        const entry = local.value.accounts.find((a) => a.social_account_id === account.id);
        return {
            id: account.id,
            platform: account.platform,
            displayName: account.display_name,
            username: account.username,
            avatarUrl: account.avatar_url,
            socialAccount: account,
            contentType: entry ? 'poster' : defaultContentTypeFor(account.platform),
            meta: entry?.meta ?? {},
        };
    }),
);

watch(() => local.value.poster_count, (count) => {
    local.value.template = count > 1 ? 'carousel' : 'single';
});

const currentTemplateLabel = computed(() =>
    local.value.poster_count > 1
        ? trans('automations.config.generate_poster.templates.carousel')
        : trans('automations.config.generate_poster.templates.single'),
);
</script>

<template>
    <div class="space-y-4">
        <!-- Channel / Social Account Selection -->
        <div class="space-y-2">
            <Label class="text-sm font-bold">{{ $t('automations.config.generate_poster.social_accounts') }}</Label>
            <InputError :message="errors?.accounts" />
            <p v-if="socialAccounts.length === 0" class="text-xs text-foreground/60">
                {{ $t('automations.config.generate_poster.social_accounts_empty') }}
            </p>
            <ChannelConfigurator
                v-else
                :channels="channels"
                :selected-ids="selectedAccountIds"
                :preview-only="true"
                @toggle="onToggleAccount"
                @update:meta="updateMeta"
            />
        </div>

        <!-- Poster Size -->
        <div class="space-y-2">
            <Label class="text-sm font-bold">{{ $t('automations.config.generate_poster.poster_size') }}</Label>
            <div class="grid grid-cols-3 gap-2">
                <button
                    v-for="size in POSTER_SIZES"
                    :key="size.value"
                    type="button"
                    class="flex flex-col items-center gap-1 rounded-xl border-2 border-foreground bg-card p-3 text-center shadow-[2px_2px_0_var(--foreground)] transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-[3px_3px_0_var(--foreground)]"
                    :class="local.poster_size === size.value
                        ? 'border-primary bg-primary/5 shadow-[2px_2px_0_var(--primary)]'
                        : ''"
                    @click="local.poster_size = size.value"
                >
                    <span class="text-lg leading-none">{{ size.icon }}</span>
                    <span class="text-[10px] font-bold text-foreground/60">{{ size.label }}</span>
                    <span class="text-[9px] font-medium text-foreground/40">{{ size.description }}</span>
                </button>
            </div>
        </div>

        <!-- Number of Posters -->
        <div class="space-y-2">
            <Label class="text-sm font-bold">{{ $t('automations.config.generate_poster.poster_count') }}</Label>
            <p class="text-xs text-foreground/60">{{ $t('automations.config.generate_poster.poster_count_hint') }}</p>
            <div class="flex flex-wrap gap-2">
                <Button
                    v-for="n in POSTER_COUNTS"
                    :key="n"
                    type="button"
                    size="icon"
                    :variant="local.poster_count === n ? 'default' : 'outline'"
                    @click="local.poster_count = n"
                >
                    {{ n }}
                </Button>
            </div>
        </div>

        <!-- Reference Images -->
        <div class="space-y-2">
            <Label class="text-sm font-bold">{{ $t('automations.config.generate_poster.reference_images') }}</Label>
            <p class="text-xs text-foreground/60">{{ $t('automations.config.generate_poster.reference_images_hint') }}</p>

            <div class="flex gap-2">
                <Button
                    v-for="n in REFERENCE_IMAGE_COUNTS"
                    :key="n"
                    type="button"
                    size="sm"
                    :variant="referenceImageCount === n ? 'default' : 'outline'"
                    @click="setReferenceImageCount(n)"
                >
                    {{ n }} {{ n === 1 ? 'image' : 'images' }}
                </Button>
                <Button
                    v-if="referenceImageCount > 0"
                    type="button"
                    size="sm"
                    variant="destructive"
                    @click="setReferenceImageCount(0)"
                >
                    <IconX class="mr-1 size-3" />
                    Clear
                </Button>
            </div>

            <div v-if="referenceImageCount > 0" class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div
                    v-for="(_, index) in referenceImageCount"
                    :key="index"
                    class="space-y-1"
                >
                    <span class="text-[11px] font-bold uppercase tracking-wider text-foreground/60">
                        Ref {{ index + 1 }}
                    </span>
                    <div
                        v-if="referenceImages[index]?.path"
                        class="group relative size-32 overflow-hidden rounded-xl border-2 border-foreground/10 bg-muted/30 transition-all hover:border-primary/50 hover:shadow-md"
                    >
                        <img
                            :src="referenceImages[index].url"
                            :alt="`Reference image ${index + 1}`"
                            class="size-full cursor-pointer object-cover transition-transform group-hover:scale-105"
                            @click="previewReferenceImage(index)"
                        />
                        <div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                            <button
                                type="button"
                                class="flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-black/80"
                                @click.stop="previewReferenceImage(index)"
                            >
                                <IconZoomIn class="size-4" />
                            </button>
                        </div>
                        <button
                            type="button"
                            class="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
                            @click.stop="removeReferenceImage(index)"
                        >
                            <IconX class="size-3.5" />
                        </button>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1">
                            <p class="truncate text-[10px] font-medium text-white">
                                {{ referenceImages[index].url.split('/').pop() || 'Image' }}
                            </p>
                        </div>
                    </div>
                    <div
                        v-else
                        class="flex size-32 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-foreground/20 bg-muted/30 p-3 transition-colors hover:border-primary/40 hover:bg-muted/50"
                    >
                        <button
                            type="button"
                            class="flex flex-col items-center gap-1.5"
                            @click="openReferenceImagePicker(index)"
                        >
                            <div class="flex size-10 items-center justify-center rounded-full bg-primary/10">
                                <IconPhoto class="size-5 text-primary" />
                            </div>
                            <span class="text-[10px] font-medium text-foreground/60">Select image</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Template (auto-determined) -->
        <div class="space-y-2">
            <Label class="text-sm font-bold">{{ $t('automations.config.generate_poster.template') }}</Label>
            <div class="flex items-center gap-3 rounded-xl border-2 border-foreground bg-muted/50 p-3">
                <div class="flex items-center gap-2">
                    <template v-if="local.poster_count === 1">
                        <span class="text-lg">🖼</span>
                    </template>
                    <template v-else>
                        <span class="text-lg">🖼🖼🖼</span>
                    </template>
                </div>
                <div>
                    <p class="text-sm font-bold">{{ currentTemplateLabel }}</p>
                    <p class="text-xs text-foreground/50">
                        {{ $t('automations.config.generate_poster.template_auto_hint') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Brand Voice Toggle -->
        <div v-show="!editorExpanded" class="flex items-start justify-between gap-3">
            <div class="space-y-0.5">
                <Label class="text-sm font-bold">{{ $t('automations.config.generate_poster.use_brand_voice') }}</Label>
                <p class="text-xs text-foreground/60">{{ $t('automations.config.generate_poster.use_brand_voice_hint') }}</p>
            </div>
            <Switch v-model="local.use_brand_voice" />
        </div>

        <!-- Brand Visuals Toggle -->
        <div v-show="!editorExpanded" class="flex items-start justify-between gap-3">
            <div class="space-y-0.5">
                <Label class="text-sm font-bold">{{ $t('automations.config.generate_poster.use_brand_visuals') }}</Label>
                <p class="text-xs text-foreground/60">{{ $t('automations.config.generate_poster.use_brand_visuals_hint') }}</p>
            </div>
            <Switch v-model="local.use_brand_visuals" />
        </div>

        <!-- Prompt Template -->
        <div v-show="!editorExpanded">
            <Label class="mb-1 block">{{ $t('automations.config.generate_poster.prompt_template') }}</Label>
            <div class="h-40">
                <CodeEditor
                    v-model="local.prompt_template"
                    language="text"
                    expandable
                    :label="$t('automations.config.generate_poster.prompt_template')"
                    placeholder="Design a poster about {{ trigger.title }}…"
                />
            </div>
            <p class="mt-1 text-xs text-foreground/50">{{ $t('automations.config.generate_poster.prompt_template_hint') }}</p>
            <InputError :message="errors?.prompt_template" class="mt-1" />
        </div>

        <!-- Hidden MediaPicker -->
        <MediaPickerDialog ref="referenceImagePicker" @select="handleReferenceImageSelect" />

        <!-- Image Preview Dialog -->
        <ImagePreviewDialog ref="imagePreview" />
    </div>
</template>
