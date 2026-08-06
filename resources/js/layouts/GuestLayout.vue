<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import dayjs from '@/dayjs';

defineProps<{
    title?: string;
}>();

const currentYear = dayjs().year();
</script>

<template>
    <div class="min-h-svh bg-background">
        <!-- Header -->
        <header class="border-b">
            <div class="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <img src="/images/trypost/logo-light.png" alt="TryPost" class="dark:hidden h-7 w-auto" />
                    <img src="/images/trypost/logo-dark.png" alt="TryPost" class="hidden dark:block h-7 w-auto" />
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="mx-auto max-w-5xl px-6 py-12">
            <h1 v-if="title" class="text-3xl font-bold mb-8">{{ title }}</h1>
            <slot />
        </main>

        <!-- Footer -->
        <footer class="border-t mt-auto">
            <div class="mx-auto max-w-5xl px-6 py-8">
                <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <p class="text-sm text-muted-foreground">
                        &copy; {{ currentYear }} TryPost. All rights reserved.
                    </p>
                    <nav class="flex gap-4 text-sm text-muted-foreground">
                        <Link :href="route('privacy')" class="hover:text-foreground transition-colors">
                            {{ $t('privacy.page_title') }}
                        </Link>
                        <Link :href="route('terms')" class="hover:text-foreground transition-colors">
                            {{ $t('terms.page_title') }}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    </div>
</template>
