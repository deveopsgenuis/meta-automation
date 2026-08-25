<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { router } from '@inertiajs/vue3';
import { IconArrowLeft, IconCheck, IconLoader2, IconPlus, IconRocket, IconTrash, IconX } from '@tabler/icons-vue';
import { trans } from 'laravel-vue-i18n';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface PlatformCredential {
    id: string;
    platform: string;
    client_id: string | null;
    callback_url: string | null;
    has_secret: boolean;
    extra: Record<string, any> | null;
    created_at: string;
}

interface TestResult {
    success: boolean;
    message: string;
    details?: Record<string, any>;
}

const props = defineProps<{
    credentials: PlatformCredential[];
}>();

const platforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'x', label: 'X (Twitter)' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'threads', label: 'Threads' },
    { value: 'pinterest', label: 'Pinterest' },
    { value: 'bluesky', label: 'Bluesky' },
    { value: 'mastodon', label: 'Mastodon' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'discord', label: 'Discord' },
];

const showModal = ref(false);
const selectedPlatform = ref('');
const editId = ref<string | null>(null);
const clientId = ref('');
const clientSecret = ref('');
const callbackUrl = ref('');
const extra = ref<Record<string, any>>({});
const isSaving = ref(false);
const isDeleting = ref<string | null>(null);
const isTesting = ref<string | null>(null);
const testResults = ref<Record<string, TestResult>>({});

const platformLabel = (platformValue: string) => {
    return platforms.find(p => p.value === platformValue)?.label || platformValue;
};

const needsClientId = (platformValue: string) => !['telegram', 'discord'].includes(platformValue);
const needsCallbackUrl = (platformValue: string) => !['bluesky', 'mastodon', 'telegram', 'discord'].includes(platformValue);

const extraFields = (platformValue: string) => {
    switch (platformValue) {
        case 'bluesky':
            return [{ key: 'service', label: 'PDS Service URL', placeholder: 'https://bsky.social', default: 'https://bsky.social' }];
        case 'mastodon':
            return [{ key: 'instance', label: 'Instance URL', placeholder: 'https://mastodon.social' }];
        case 'youtube':
            return [
                { key: 'youtube_data_api', label: 'YouTube Data API URL', placeholder: 'https://www.googleapis.com/youtube/v3' },
                { key: 'youtube_oauth_api', label: 'YouTube OAuth API URL', placeholder: 'https://oauth2.googleapis.com' },
            ];
        default:
            return [];
    }
};

const openAddModal = (platformValue: string) => {
    selectedPlatform.value = platformValue;
    editId.value = null;
    clientId.value = '';
    clientSecret.value = '';
    callbackUrl.value = '';
    extra.value = {};
    showModal.value = true;
};

const openEditModal = (cred: PlatformCredential) => {
    selectedPlatform.value = cred.platform;
    editId.value = cred.id;
    clientId.value = cred.client_id || '';
    clientSecret.value = '';
    callbackUrl.value = cred.callback_url || '';
    extra.value = cred.extra || {};
    showModal.value = true;
};

const save = async () => {
    isSaving.value = true;

    try {
        const response = await fetch('/platform-credentials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                platform: selectedPlatform.value,
                client_id: clientId.value || null,
                client_secret: clientSecret.value || null,
                callback_url: callbackUrl.value || null,
                extra: Object.keys(extra.value).length > 0 ? extra.value : null,
            }),
        });

        if (response.ok) {
            toast.success(trans('accounts.credentials_saved'));
            showModal.value = false;
            router.reload();
        } else {
            const data = await response.json();
            toast.error(data.message || trans('accounts.credentials_error'));
        }
    } catch (error) {
        toast.error(trans('accounts.credentials_error'));
    } finally {
        isSaving.value = false;
    }
};

const deleteCredential = async (id: string) => {
    isDeleting.value = id;

    try {
        const response = await fetch(`/platform-credentials/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            toast.success(trans('accounts.credentials_deleted'));
            router.reload();
        } else {
            toast.error(trans('accounts.credentials_error'));
        }
    } catch (error) {
        toast.error(trans('accounts.credentials_error'));
    } finally {
        isDeleting.value = null;
    }
};

const testCredential = async (id: string) => {
    isTesting.value = id;

    try {
        const response = await fetch(`/platform-credentials/${id}/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
        });

        testResults.value[id] = await response.json();
    } catch (error) {
        testResults.value[id] = { success: false, message: 'Test failed' };
    } finally {
        isTesting.value = null;
    }
};
</script>

<template>
    <AppLayout>
        <div class="mx-auto max-w-5xl p-6">
            <div class="mb-6 flex items-center gap-3">
                <a href="/accounts" class="inline-flex items-center justify-center rounded-lg border-2 border-foreground p-2 shadow-xs hover:bg-muted">
                    <IconArrowLeft class="size-5" />
                </a>
                <div>
                    <h1 class="text-2xl font-bold">{{ $t('accounts.platform_credentials_title') }}</h1>
                    <p class="text-sm text-foreground/60">{{ $t('accounts.platform_credentials_description') }}</p>
                </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card v-for="platform in platforms" :key="platform.value" class="relative">
                    <CardHeader>
                        <CardTitle class="text-lg">{{ platform.label }}</CardTitle>
                        <CardDescription>{{ $t('accounts.descriptions.' + platform.value) }}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div v-if="credentials.find(c => c.platform === platform.value)" class="space-y-3">
                            <div class="flex items-center gap-2">
                                <Badge variant="secondary">
                                    <IconCheck class="mr-1 size-3" />
                                    {{ $t('accounts.credentials_configured') }}
                                </Badge>
                            </div>

                            <div class="text-xs text-foreground/60">
                                <p v-if="credentials.find(c => c.platform === platform.value)?.client_id">
                                    {{ $t('accounts.client_id') }}: {{ credentials.find(c => c.platform === platform.value)?.client_id }}
                                </p>
                            </div>

                            <div v-if="testResults[credentials.find(c => c.platform === platform.value)?.id]" class="rounded border p-2 text-xs" :class="testResults[credentials.find(c => c.platform === platform.value)?.id].success ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'">
                                {{ testResults[credentials.find(c => c.platform === platform.value)?.id].message }}
                            </div>

                            <div class="flex gap-2">
                                <Button variant="outline" size="sm" class="flex-1" @click="openEditModal(credentials.find(c => c.platform === platform.value)!)">
                                    {{ $t('accounts.edit_credentials') }}
                                </Button>
                                <Button variant="outline" size="sm" @click="testCredential(credentials.find(c => c.platform === platform.value)!.id)" :disabled="isTesting === credentials.find(c => c.platform === platform.value)?.id">
                                    <IconLoader2 v-if="isTesting === credentials.find(c => c.platform === platform.value)?.id" class="size-4 animate-spin" />
                                    <IconRocket v-else class="size-4" />
                                </Button>
                                <Button variant="destructive" size="sm" @click="deleteCredential(credentials.find(c => c.platform === platform.value)!.id)" :disabled="isDeleting === credentials.find(c => c.platform === platform.value)?.id">
                                    <IconTrash class="size-4" />
                                </Button>
                            </div>
                        </div>

                        <Button v-else variant="outline" class="w-full" @click="openAddModal(platform.value)">
                            <IconPlus class="mr-1 size-4" />
                            {{ $t('accounts.add_credentials') }}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>

        <Dialog :open="showModal" @update:open="showModal = $event">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{{ $t('accounts.credentials_title', { platform: platformLabel(selectedPlatform) }) }}</DialogTitle>
                    <DialogDescription>
                        {{ $t('accounts.credentials_description', { platform: platformLabel(selectedPlatform) }) }}
                    </DialogDescription>
                </DialogHeader>

                <div class="space-y-4">
                    <div v-if="needsClientId(selectedPlatform)" class="space-y-2">
                        <Label for="client_id">{{ $t('accounts.client_id') }}</Label>
                        <Input id="client_id" v-model="clientId" :placeholder="$t('accounts.client_id_placeholder')" />
                    </div>

                    <div class="space-y-2">
                        <Label for="client_secret">{{ $t('accounts.client_secret') }} {{ editId ? `(${$t('accounts.leave_empty_to_keep')})` : '' }}</Label>
                        <Input id="client_secret" v-model="clientSecret" type="password" :placeholder="$t('accounts.client_secret_placeholder')" />
                    </div>

                    <div v-if="needsCallbackUrl(selectedPlatform)" class="space-y-2">
                        <Label for="callback_url">{{ $t('accounts.callback_url') }}</Label>
                        <Input id="callback_url" v-model="callbackUrl" :placeholder="$t('accounts.callback_url_placeholder')" />
                    </div>

                    <div v-for="field in extraFields(selectedPlatform)" :key="field.key" class="space-y-2">
                        <Label :for="field.key">{{ field.label }}</Label>
                        <Input :id="field.key" v-model="extra[field.key]" :placeholder="field.placeholder" />
                    </div>
                </div>

                <DialogFooter>
                    <Button @click="save" :disabled="isSaving">
                        <IconLoader2 v-if="isSaving" class="mr-1 size-4 animate-spin" />
                        {{ $t('accounts.save_credentials') }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>
