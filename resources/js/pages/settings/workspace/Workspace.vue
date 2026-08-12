<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n';
import { computed, ref } from 'vue';

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue';
import PageHeader from '@/components/PageHeader.vue';
import SettingsTabsNav from '@/components/settings/SettingsTabsNav.vue';
import WorkspaceTab from '@/components/settings/WorkspaceTab.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { members as membersRoute } from '@/routes/app';
import { index as apiKeysRoute } from '@/routes/app/api-keys';
import { destroy as destroyWorkspace } from '@/routes/app/workspaces';
import { brand as brandRoute, settings as workspaceSettings } from '@/routes/app/workspace';

interface Workspace {
    id: string;
    name: string;
    has_logo: boolean;
    logo_url: string | null;
    brand_website: string | null;
    brand_description: string | null;
    brand_voice_traits: string[] | null;
    content_language: string;
}

defineProps<{
    workspace: Workspace;
}>();

const tabs = computed(() => [
    { name: 'workspace', label: trans('settings.workspace.tabs.workspace'), href: workspaceSettings.url() },
    { name: 'brand', label: trans('settings.workspace.tabs.brand'), href: brandRoute.url() },
    { name: 'members', label: trans('settings.workspace.tabs.users'), href: membersRoute.url() },
    { name: 'api-keys', label: trans('settings.workspace.tabs.api_keys'), href: apiKeysRoute.url() },
]);

const deleteWorkspaceModal = ref<InstanceType<typeof ConfirmDeleteModal> | null>(null);

const handleDeleteWorkspace = (ws: Workspace) => {
    deleteWorkspaceModal.value?.open({
        url: destroyWorkspace.url(ws.id),
        confirmText: ws.name,
    });
};
</script>

<template>
    <Head :title="$t('settings.workspace.title')" />

    <AppLayout>
        <div class="mx-auto max-w-4xl space-y-8 px-6 py-8">
            <PageHeader
                :title="$t('settings.hub.title')"
                :description="$t('settings.hub.description')"
                />

            <SettingsTabsNav :tabs="tabs" active="workspace" />

            <WorkspaceTab :workspace="workspace" />

            <div class="border-t pt-6">
                <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-md border border-rose-600 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    @click="handleDeleteWorkspace(workspace)"
                >
                    Delete Workspace
                </button>
            </div>
        </div>
    </AppLayout>

    <ConfirmDeleteModal
        ref="deleteWorkspaceModal"
        :title="$t('settings.workspace.delete_modal.title')"
        :description="$t('settings.workspace.delete_modal.description')"
        :action="$t('settings.workspace.delete_modal.action')"
    />
</template>
