<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { IconLoader2, IconRocket, IconCheck, IconX } from '@tabler/icons-vue';
import { trans } from 'laravel-vue-i18n';
import { ref, watch } from 'vue';
import { toast } from 'vue-sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TestResult {
    success: boolean;
    message: string;
    details?: Record<string, any>;
}

const props = defineProps<{
    open: boolean;
    platform: string;
}>();

const emit = defineEmits<{
    'update:open': [value: boolean];
    saved: [];
}>();

const clientId = ref('');
const clientSecret = ref('');
const callbackUrl = ref('');
const extra = ref<Record<string, any>>({});

const isSaving = ref(false);
const isTesting = ref(false);
const testResult = ref<TestResult | null>(null);

const platformLabel = () => trans(`accounts.platforms.${props.platform}`);

const needsClientId = () => !['telegram', 'discord'].includes(props.platform);
const needsClientSecret = () => true;
const needsCallbackUrl = () => !['bluesky', 'mastodon', 'telegram', 'discord'].includes(props.platform);
const needsExtra = () => ['bluesky', 'mastodon', 'youtube'].includes(props.platform);

const extraFields = () => {
    switch (props.platform) {
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

watch(() => props.platform, () => {
    clientId.value = '';
    clientSecret.value = '';
    callbackUrl.value = '';
    extra.value = {};
    testResult.value = null;
});

const save = async () => {
    isSaving.value = true;
    testResult.value = null;

    try {
        const response = await fetch('/platform-credentials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                platform: props.platform,
                client_id: clientId.value || null,
                client_secret: clientSecret.value || null,
                callback_url: callbackUrl.value || null,
                extra: Object.keys(extra.value).length > 0 ? extra.value : null,
            }),
        });

        if (response.ok) {
            toast.success(trans('accounts.credentials_saved'));
            emit('saved');
            emit('update:open', false);
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

const test = async () => {
    isTesting.value = true;
    testResult.value = null;

    try {
        const saveResponse = await fetch('/platform-credentials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                platform: props.platform,
                client_id: clientId.value || null,
                client_secret: clientSecret.value || null,
                callback_url: callbackUrl.value || null,
                extra: Object.keys(extra.value).length > 0 ? extra.value : null,
            }),
        });

        if (!saveResponse.ok) {
            testResult.value = { success: false, message: 'Save credentials first' };
            return;
        }

        const saved = await saveResponse.json();

        const testResponse = await fetch(`/platform-credentials/${saved.id}/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                'Accept': 'application/json',
            },
        });

        testResult.value = await testResponse.json();
    } catch (error) {
        testResult.value = { success: false, message: 'Test failed' };
    } finally {
        isTesting.value = false;
    }
};
</script>

<template>
    <Dialog :open="open" @update:open="emit('update:open', $event)">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{{ $t('accounts.credentials_title', { platform: platformLabel() }) }}</DialogTitle>
                <DialogDescription>
                    {{ $t('accounts.credentials_description', { platform: platformLabel() }) }}
                </DialogDescription>
            </DialogHeader>

            <div class="space-y-4">
                <div v-if="needsClientId()" class="space-y-2">
                    <Label for="client_id">{{ $t('accounts.client_id') }}</Label>
                    <Input
                        id="client_id"
                        v-model="clientId"
                        :placeholder="$t('accounts.client_id_placeholder')"
                    />
                </div>

                <div v-if="needsClientSecret()" class="space-y-2">
                    <Label for="client_secret">{{ $t('accounts.client_secret') }}</Label>
                    <Input
                        id="client_secret"
                        v-model="clientSecret"
                        type="password"
                        :placeholder="$t('accounts.client_secret_placeholder')"
                    />
                </div>

                <div v-if="needsCallbackUrl()" class="space-y-2">
                    <Label for="callback_url">{{ $t('accounts.callback_url') }}</Label>
                    <Input
                        id="callback_url"
                        v-model="callbackUrl"
                        :placeholder="$t('accounts.callback_url_placeholder')"
                    />
                </div>

                <div v-for="field in extraFields()" :key="field.key" class="space-y-2">
                    <Label :for="field.key">{{ field.label }}</Label>
                    <Input
                        :id="field.key"
                        v-model="extra[field.key]"
                        :placeholder="field.placeholder"
                    />
                </div>

                <div v-if="testResult" class="rounded-lg border p-3" :class="testResult.success ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'">
                    <div class="flex items-center gap-2">
                        <IconCheck v-if="testResult.success" class="size-4 text-emerald-600" />
                        <IconX v-else class="size-4 text-rose-600" />
                        <span class="text-sm" :class="testResult.success ? 'text-emerald-700' : 'text-rose-700'">
                            {{ testResult.message }}
                        </span>
                    </div>
                </div>
            </div>

            <DialogFooter class="gap-2">
                <Button variant="outline" @click="test" :disabled="isTesting">
                    <IconLoader2 v-if="isTesting" class="mr-1 size-4 animate-spin" />
                    <IconRocket v-else class="mr-1 size-4" />
                    {{ $t('accounts.test_credentials') }}
                </Button>
                <Button @click="save" :disabled="isSaving">
                    <IconLoader2 v-if="isSaving" class="mr-1 size-4 animate-spin" />
                    {{ $t('accounts.save_credentials') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
