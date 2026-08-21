<script setup lang="ts">
import { IconPhoto } from '@tabler/icons-vue';
import { Handle, Position } from '@vue-flow/core';
import { trans, transChoice } from 'laravel-vue-i18n';
import { computed } from 'vue';

const props = defineProps<{
    data: {
        accounts?: Array<{ social_account_id: string }>;
        social_account_ids?: string[];
        poster_size?: string;
        poster_count?: number;
        template?: string;
    };
    selected?: boolean;
}>();

const summary = computed(() => {
    const count = props.data.accounts?.length ?? props.data.social_account_ids?.length ?? 0;
    const size = trans(`automations.config.generate_poster.sizes.${props.data.poster_size ?? '1080*1080'}`);
    const posterCount = props.data.poster_count ?? 1;
    const template = trans(`automations.config.generate_poster.templates.${posterCount > 1 ? 'carousel' : 'single'}`);
    return transChoice('automations.config.generate_poster.account_summary', count, {
        count: String(count),
        size,
        template,
        posterCount: String(posterCount),
    });
});
</script>

<template>
    <div
        class="automation-node automation-node--accent-violet"
        :class="{ 'is-selected': selected }"
    >
        <div class="automation-node__header">
            <div class="automation-node__icon-tile automation-node__icon-tile--violet">
                <IconPhoto :size="16" />
            </div>
            <span class="automation-node__title">{{ $t('automations.nodes.generate_poster') }}</span>
        </div>
        <div class="automation-node__summary">
            {{ summary }}
        </div>
        <Handle
            type="target"
            :position="Position.Left"
            class="!bg-violet-500"
        />
        <Handle
            type="source"
            :position="Position.Right"
            class="!bg-violet-500"
        />
    </div>
</template>
