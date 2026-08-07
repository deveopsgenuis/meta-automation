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
    acceptance: {
        title: trans('terms.sections.acceptance.title'),
        content: trans('terms.sections.acceptance.content'),
    },
    user_responsibilities: {
        title: trans('terms.sections.user_responsibilities.title'),
        content: trans('terms.sections.user_responsibilities.content'),
        items: trans('terms.sections.user_responsibilities.items') as unknown as string[],
    },
    third_party_accounts: {
        title: trans('terms.sections.third_party_accounts.title'),
        content: trans('terms.sections.third_party_accounts.content'),
        items: trans('terms.sections.third_party_accounts.items') as unknown as string[],
    },
    acceptable_use: {
        title: trans('terms.sections.acceptable_use.title'),
        content: trans('terms.sections.acceptable_use.content'),
        items: trans('terms.sections.acceptable_use.items') as unknown as string[],
    },
    availability: {
        title: trans('terms.sections.availability.title'),
        content: trans('terms.sections.availability.content'),
    },
    liability: {
        title: trans('terms.sections.liability.title'),
        content: trans('terms.sections.liability.content'),
        items: trans('terms.sections.liability.items') as unknown as string[],
    },
    termination: {
        title: trans('terms.sections.termination.title'),
        content: trans('terms.sections.termination.content'),
    },
    intellectual_property: {
        title: trans('terms.sections.intellectual_property.title'),
        content: trans('terms.sections.intellectual_property.content'),
    },
    governing_law: {
        title: trans('terms.sections.governing_law.title'),
        content: trans('terms.sections.governing_law.content'),
    },
    contact: {
        title: trans('terms.sections.contact.title'),
        content: trans('terms.sections.contact.content'),
        company: trans('terms.sections.contact.company'),
        rc: trans('terms.sections.contact.rc'),
        if: trans('terms.sections.contact.if'),
        tp: trans('terms.sections.contact.tp'),
        address: trans('terms.sections.contact.address'),
        email: trans('terms.sections.contact.email'),
        phone: trans('terms.sections.contact.phone'),
    },
}));
</script>

<template>
    <GuestLayout :title="trans('terms.page_title')">
        <Head :title="trans('terms.page_title')" />

        <div class="prose prose-neutral dark:prose-invert max-w-none">
            <p class="text-sm text-muted-foreground">{{ trans('terms.last_updated') }}</p>

            <p>{{ trans('terms.intro') }}</p>

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
