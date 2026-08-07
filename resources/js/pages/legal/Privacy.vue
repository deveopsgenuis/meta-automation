<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { computed } from 'vue';

interface Section {
    title: string;
    content?: string;
    items?: string[];
    company?: string;
    rc?: string;
    if?: string;
    tp?: string;
    address?: string;
    email?: string;
    phone?: string;
}

const sections = computed<Record<string, Section>>(() => ({
    data_collection: {
        title: trans('privacy.sections.data_collection.title'),
        content: trans('privacy.sections.data_collection.content'),
        items: trans('privacy.sections.data_collection.items') as unknown as string[],
    },
    data_use: {
        title: trans('privacy.sections.data_use.title'),
        content: trans('privacy.sections.data_use.content'),
        items: trans('privacy.sections.data_use.items') as unknown as string[],
    },
    data_usage: {
        title: trans('privacy.sections.data_usage.title'),
        content: trans('privacy.sections.data_usage.content'),
        items: trans('privacy.sections.data_usage.items') as unknown as string[],
    },
    data_retention: {
        title: trans('privacy.sections.data_retention.title'),
        content: trans('privacy.sections.data_retention.content'),
    },
    data_deletion: {
        title: trans('privacy.sections.data_deletion.title'),
        content: trans('privacy.sections.data_deletion.content'),
        items: trans('privacy.sections.data_deletion.items') as unknown as string[],
    },
    data_security: {
        title: trans('privacy.sections.data_security.title'),
        content: trans('privacy.sections.data_security.content'),
    },
    cookies: {
        title: trans('privacy.sections.cookies.title'),
        content: trans('privacy.sections.cookies.content'),
    },
    children: {
        title: trans('privacy.sections.children.title'),
        content: trans('privacy.sections.children.content'),
    },
    changes: {
        title: trans('privacy.sections.changes.title'),
        content: trans('privacy.sections.changes.content'),
    },
    contact: {
        title: trans('privacy.sections.contact.title'),
        content: trans('privacy.sections.contact.content'),
        company: trans('privacy.sections.contact.company'),
        rc: trans('privacy.sections.contact.rc'),
        if: trans('privacy.sections.contact.if'),
        tp: trans('privacy.sections.contact.tp'),
        address: trans('privacy.sections.contact.address'),
        email: trans('privacy.sections.contact.email'),
        phone: trans('privacy.sections.contact.phone'),
    },
}));
</script>

<template>
    <GuestLayout :title="trans('privacy.page_title')">
        <Head :title="trans('privacy.page_title')" />

        <div class="prose prose-neutral dark:prose-invert max-w-none">
            <p class="text-sm text-muted-foreground">{{ trans('privacy.last_updated') }}</p>

            <p>{{ trans('privacy.intro') }}</p>

            <div v-for="(section, key) in sections" :key="key" class="mt-8">
                <h2 class="text-xl font-semibold">{{ section.title }}</h2>

                <p v-if="section.content">{{ section.content }}</p>

                <ul v-if="section.items" class="mt-3 list-disc space-y-2 pl-6">
                    <li v-for="(item, i) in section.items" :key="i">{{ item }}</li>
                </ul>

                <div v-if="key === 'contact'" class="mt-4 rounded-lg border bg-muted/50 p-4">
                    <p class="font-semibold">{{ section.company }}</p>
                    <p>{{ section.rc }}</p>
                    <p>{{ section.if }}</p>
                    <p>{{ section.tp }}</p>
                    <p>{{ section.address }}</p>
                    <p class="mt-2">
                        <span class="font-medium">Email:</span> {{ section.email }}
                    </p>
                    <p>
                        <span class="font-medium">Tél:</span> {{ section.phone }}
                    </p>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
