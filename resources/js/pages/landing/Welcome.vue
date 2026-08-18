<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { trans } from 'laravel-vue-i18n';
import {
    IconBrandInstagram,
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandX,
    IconBrandTiktok,
    IconBrandYoutube,
    IconWand,
    IconSparkles,
    IconCode,
    IconPlugConnected,
    IconBrandWhatsapp,
    IconArrowRight,
    IconPlayerPlay,
    IconCheck,
    IconBrandThreads,
    IconBrandPinterest,
} from '@tabler/icons-vue';

const WhatsAppNumber = '212720989172';
const WhatsAppMessage = computed(() => encodeURIComponent(trans('welcome.whatsapp.message')));
const whatsappUrl = computed(() => `https://wa.me/${WhatsAppNumber}?text=${WhatsAppMessage.value}`);

const features = [
    { icon: IconBrandInstagram, name: 'Instagram' },
    { icon: IconBrandFacebook, name: 'Facebook' },
    { icon: IconBrandLinkedin, name: 'LinkedIn' },
    { icon: IconBrandX, name: 'X' },
    { icon: IconBrandTiktok, name: 'TikTok' },
    { icon: IconBrandYoutube, name: 'YouTube' },
    { icon: IconBrandThreads, name: 'Threads' },
    { icon: IconBrandPinterest, name: 'Pinterest' },
];

const steps = computed(() => [
    {
        icon: IconPlugConnected,
        title: trans('welcome.how_it_works.steps.connect.title'),
        description: trans('welcome.how_it_works.steps.connect.description'),
    },
    {
        icon: IconWand,
        title: trans('welcome.how_it_works.steps.automate.title'),
        description: trans('welcome.how_it_works.steps.automate.description'),
    },
    {
        icon: IconSparkles,
        title: trans('welcome.how_it_works.steps.grow.title'),
        description: trans('welcome.how_it_works.steps.grow.description'),
    },
]);

const integrations = computed(() => trans('welcome.integration.items') as unknown as string[]);

const videoRef = ref<HTMLVideoElement | null>(null);
const isVideoPlaying = ref(false);

const toggleVideo = () => {
    if (!videoRef.value) return;
    if (isVideoPlaying.value) {
        videoRef.value.pause();
    } else {
        videoRef.value.play();
    }
    isVideoPlaying.value = !isVideoPlaying.value;
};
</script>

<template>
    <Head :title="$t('welcome.meta.title')" />

    <div class="min-h-svh bg-background">
        <!-- Header -->
        <header class="sticky top-0 z-50 border-b-2 border-foreground bg-background/80 backdrop-blur-md">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" class="flex items-center gap-2">
                    <img
                        src="/images/trypost/logo-light.png"
                        alt="Metos Automation"
                        class="h-7 w-auto"
                    />
                </Link>
                <div class="flex items-center gap-3">
                    <Link
                        href="/login"
                        class="hidden text-sm font-bold text-foreground/70 transition-colors hover:text-foreground sm:block"
                    >
                        {{ $t('welcome.header.login') }}
                    </Link>
                    <a
                        :href="whatsappUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 rounded-xl border-2 border-foreground bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <IconBrandWhatsapp class="size-4" />
                        {{ $t('welcome.header.book_demo') }}
                    </a>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="relative overflow-hidden">
            <!-- Decorative blobs -->
            <div class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-violet-200/40 blur-3xl" />
            <div class="pointer-events-none absolute -bottom-40 -left-40 size-[500px] rounded-full bg-fuchsia-200/30 blur-3xl" />

            <!-- Dot pattern -->
            <div
                class="pointer-events-none absolute inset-0 opacity-[0.04]"
                style="background-image: radial-gradient(circle, #0a0a0a 1px, transparent 1px); background-size: 32px 32px;"
            />

            <div class="relative mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
                <div class="mx-auto max-w-4xl text-center">
                    <!-- Auto mode badge -->
                    <div class="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 shadow-sm">
                        <span class="relative flex size-2">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
                            <span class="relative inline-flex size-2 rounded-full bg-emerald-400" />
                        </span>
                        <span class="text-xs font-bold uppercase tracking-widest text-foreground/70">
                            {{ $t('welcome.hero.auto_mode') }}
                        </span>
                    </div>

                    <!-- Headline -->
                    <h1 class="h1 text-foreground">
                        {{ $t('welcome.hero.headline_1') }}
                        <span class="relative text-primary">
                            {{ $t('welcome.hero.headline_2') }}
                            <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                <path d="M2 8c50-6 100-6 150-3s100 3 146-2" stroke="#7c3aed" stroke-width="3" stroke-linecap="round" />
                            </svg>
                        </span>
                    </h1>

                    <!-- Subtitle -->
                    <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60 sm:text-xl">
                        {{ $t('welcome.hero.subtitle') }}
                    </p>

                    <!-- CTA buttons -->
                    <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            :href="whatsappUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 rounded-xl border-2 border-foreground bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <IconBrandWhatsapp class="size-5" />
                            {{ $t('welcome.hero.cta_start') }}
                        </a>
                        <a
                            href="#demo"
                            class="inline-flex items-center gap-2 rounded-xl border-2 border-foreground bg-card px-8 py-4 text-base font-bold text-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                        >
                            <IconPlayerPlay class="size-5" />
                            {{ $t('welcome.hero.cta_demo') }}
                        </a>
                    </div>

                    <!-- Platform icons strip -->
                    <div class="mt-14 flex flex-wrap items-center justify-center gap-3">
                        <div
                            v-for="platform in features"
                            :key="platform.name"
                            class="group flex size-12 items-center justify-center rounded-xl border-2 border-foreground bg-card shadow-xs transition-all hover:-translate-y-1 hover:shadow-md hover:bg-accent"
                            :title="platform.name"
                        >
                            <component :is="platform.icon" class="size-6 text-foreground/60 transition-colors group-hover:text-primary" />
                        </div>
                    </div>
                    <p class="mt-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
                        {{ $t('welcome.hero.more_platforms') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- How It Works — 3 Steps -->
        <section class="border-y-2 border-foreground bg-secondary/50">
            <div class="mx-auto max-w-7xl px-6 py-20 sm:py-28">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="h2 text-foreground">{{ $t('welcome.how_it_works.title') }}</h2>
                    <p class="mt-4 text-lg text-foreground/60">
                        {{ $t('welcome.how_it_works.subtitle') }}
                    </p>
                </div>

                <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div
                        v-for="(step, index) in steps"
                        :key="step.title"
                        class="relative rounded-2xl border-2 border-foreground bg-card p-8 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div class="mb-6 flex size-14 items-center justify-center rounded-xl border-2 border-foreground bg-accent shadow-sm">
                            <component :is="step.icon" class="size-7 text-primary" />
                        </div>
                        <div class="mb-2 flex items-center gap-3">
                            <span class="text-xs font-black uppercase tracking-widest text-foreground/30">
                                {{ $t('welcome.how_it_works.step', { number: index + 1 as any }) }}
                            </span>
                        </div>
                        <h3 class="font-display text-2xl font-normal text-foreground">{{ step.title }}</h3>
                        <p class="mt-3 text-sm leading-relaxed text-foreground/60">
                            {{ step.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Demo Video Section -->
        <section id="demo" class="relative">
            <div class="mx-auto max-w-7xl px-6 py-20 sm:py-28">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="h2 text-foreground">{{ $t('welcome.demo.title') }}</h2>
                    <p class="mt-4 text-lg text-foreground/60">
                        {{ $t('welcome.demo.subtitle') }}
                    </p>
                </div>

                <div class="mx-auto mt-14 max-w-4xl">
                    <div class="group relative overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-xl">
                        <!-- Video -->
                        <video
                            ref="videoRef"
                            class="aspect-video w-full bg-black object-contain"
                            preload="metadata"
                            playsinline
                            @ended="isVideoPlaying = false"
                            @pause="isVideoPlaying = false"
                            @play="isVideoPlaying = true"
                        >
                            <source src="/images/videos/metos-videos.webm" type="video/webm" />
                            <source src="/images/videos/metos-videos-mp4.mp4" type="video/mp4" />
                        </video>

                        <!-- Play button overlay (hidden when playing) -->
                        <Transition
                            enter-active-class="transition-opacity duration-200"
                            leave-active-class="transition-opacity duration-200"
                            enter-from-class="opacity-0"
                            leave-to-class="opacity-0"
                        >
                            <button
                                v-if="!isVideoPlaying"
                                class="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
                                @click="toggleVideo"
                            >
                                <div class="flex size-20 items-center justify-center rounded-full border-2 border-foreground bg-card shadow-lg transition-all group-hover:scale-110 sm:size-24">
                                    <IconPlayerPlay class="size-8 text-primary sm:size-10" />
                                </div>
                            </button>
                        </Transition>
                    </div>
                </div>
            </div>
        </section>

        <!-- Integration Section -->
        <section class="border-y-2 border-foreground bg-secondary/50">
            <div class="mx-auto max-w-7xl px-6 py-20 sm:py-28">
                <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <!-- Left: Content -->
                    <div>
                        <div class="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-3 py-1 shadow-xs">
                            <IconCode class="size-3.5 text-primary" />
                            <span class="text-[10px] font-bold uppercase tracking-widest text-foreground/60">
                                {{ $t('welcome.integration.badge') }}
                            </span>
                        </div>
                        <h2 class="h2 text-foreground">
                            {{ $t('welcome.integration.title_1') }}
                            <span class="text-primary">{{ $t('welcome.integration.title_2') }}</span>
                        </h2>
                        <p class="mt-6 text-lg leading-relaxed text-foreground/60">
                            {{ $t('welcome.integration.description') }}
                        </p>

                        <ul class="mt-8 space-y-4">
                            <li
                                v-for="item in integrations"
                                :key="item"
                                class="flex items-center gap-3"
                            >
                                <div class="flex size-6 shrink-0 items-center justify-center rounded-md border-2 border-foreground bg-primary/10">
                                    <IconCheck class="size-3.5 text-primary" />
                                </div>
                                <span class="text-sm font-medium text-foreground/70">{{ item }}</span>
                            </li>
                        </ul>

                        <a
                            :href="whatsappUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="mt-10 inline-flex items-center gap-2 rounded-xl border-2 border-foreground bg-foreground px-6 py-3 text-sm font-bold text-background shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                        >
                            {{ $t('welcome.integration.learn_more') }}
                            <IconArrowRight class="size-4" />
                        </a>
                    </div>

                    <!-- Right: Code mockup -->
                    <div class="relative">
                        <div class="overflow-hidden rounded-2xl border-2 border-foreground bg-card shadow-xl">
                            <div class="flex items-center gap-2 border-b-2 border-foreground bg-muted px-4 py-2.5">
                                <div class="flex gap-1.5">
                                    <span class="size-2.5 rounded-full border border-foreground bg-rose-300" />
                                    <span class="size-2.5 rounded-full border border-foreground bg-amber-300" />
                                    <span class="size-2.5 rounded-full border border-foreground bg-emerald-300" />
                                </div>
                                <span class="ml-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                    index.html
                                </span>
                            </div>
                            <div class="p-5 font-mono text-xs leading-relaxed">
                                <div class="text-foreground/40">&lt;!-- {{ $t('welcome.integration.code_comment_add') }} --&gt;</div>
                                <div class="mt-2">
                                    <span class="text-foreground/40">&lt;</span><span class="text-primary">script</span>
                                    <span class="text-foreground/60"> src=</span><span class="text-emerald-600">"https://metos.app/widget.js"</span>
                                    <span class="text-foreground/40">&gt;&lt;/</span><span class="text-primary">script</span><span class="text-foreground/40">&gt;</span>
                                </div>
                                <div class="mt-4 text-foreground/40">&lt;!-- {{ $t('welcome.integration.code_comment_done') }} --&gt;</div>
                                <div class="mt-2 text-foreground/40">&lt;!-- {{ $t('welcome.integration.code_comment_automated') }} --&gt;</div>
                            </div>
                        </div>
                        <div class="pointer-events-none absolute -bottom-10 -right-10 size-[200px] rounded-full bg-violet-200/40 blur-3xl" />
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA / Contact Section -->
        <section class="relative overflow-hidden">
            <div class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-violet-200/30 blur-3xl" />

            <div class="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
                <div class="mx-auto max-w-3xl rounded-3xl border-2 border-foreground bg-card p-10 text-center shadow-xl sm:p-16">
                    <div class="mb-6 inline-flex size-16 items-center justify-center rounded-2xl border-2 border-foreground bg-accent shadow-sm">
                        <IconBrandWhatsapp class="size-8 text-primary" />
                    </div>

                    <h2 class="h2 text-foreground">
                        {{ $t('welcome.cta.title') }}
                    </h2>
                    <p class="mx-auto mt-4 max-w-lg text-lg text-foreground/60">
                        {{ $t('welcome.cta.description') }}
                    </p>

                    <a
                        :href="whatsappUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="mt-10 inline-flex items-center gap-3 rounded-xl border-2 border-foreground bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                    >
                        <IconBrandWhatsapp class="size-6" />
                        {{ $t('welcome.cta.button') }}
                    </a>

                    <p class="mt-6 text-xs text-foreground/40">
                        {{ $t('welcome.cta.reply_note') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t-2 border-foreground bg-secondary/30">
            <div class="mx-auto max-w-7xl px-6 py-10">
                <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                    <div class="flex items-center gap-2">
                        <img
                            src="/images/trypost/logo-light.png"
                            alt="Metos Automation"
                            class="h-6 w-auto"
                        />
                    </div>
                    <p class="text-sm text-foreground/40">
                        &copy; {{ new Date().getFullYear() }} {{ $t('welcome.footer.copyright') }}
                    </p>
                    <nav class="flex gap-4 text-sm text-foreground/40">
                        <Link href="/privacy" class="transition-colors hover:text-foreground">
                            {{ $t('welcome.footer.privacy') }}
                        </Link>
                        <Link href="/terms" class="transition-colors hover:text-foreground">
                            {{ $t('welcome.footer.terms') }}
                        </Link>
                        <Link href="/login" class="transition-colors hover:text-foreground">
                            {{ $t('welcome.footer.login') }}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    </div>
</template>
