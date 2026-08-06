<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import GuestLayout from '@/layouts/GuestLayout.vue';
</script>

<template>
    <GuestLayout :title="$t('terms.page_title')">
        <Head :title="$t('terms.page_title')" />

        <div class="prose prose-neutral dark:prose-invert max-w-none">
            <p class="text-sm text-muted-foreground">{{ $t('privacy.last_updated') }}</p>

            <p>{{ $t('terms.intro') }}</p>

            <div v-for="(section, key) in $t('terms.sections')" :key="key" class="mt-8">
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
