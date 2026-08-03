<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { computed, ref, watch } from 'vue';

interface Props {
    modelValue: boolean;
    submitting?: boolean;
    prompt?: string;
    systemPrompt?: string;
    mode?: 'single' | 'bulk';
}

const props = withDefaults(defineProps<Props>(), {
    submitting: false,
    prompt: '',
    systemPrompt: '',
    mode: 'single',
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
    submit: [payload: { prompt: string; systemPrompt: string; mode: 'single' | 'bulk' }];
}>();

const internalOpen = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value),
});

const promptValue = ref(props.prompt);
const systemPromptValue = ref(props.systemPrompt);
const modeValue = ref<'single' | 'bulk'>(props.mode);

watch(() => props.prompt, (value) => {
    promptValue.value = value;
});

watch(() => props.systemPrompt, (value) => {
    systemPromptValue.value = value;
});

watch(() => props.mode, (value) => {
    modeValue.value = value;
});

const submit = () => {
    emit('submit', {
        prompt: promptValue.value.trim(),
        systemPrompt: systemPromptValue.value.trim(),
        mode: modeValue.value,
    });
};
</script>

<template>
    <Dialog v-model:open="internalOpen">
        <DialogContent class="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>{{ $t('calendar.poster_dialog.title') }}</DialogTitle>
                <DialogDescription>{{ $t('calendar.poster_dialog.description') }}</DialogDescription>
            </DialogHeader>

            <div class="space-y-4">
                <div class="grid gap-2">
                    <Label for="poster-design-prompt">{{ $t('calendar.poster_dialog.prompt_label') }}</Label>
                    <Textarea
                        id="poster-design-prompt"
                        v-model="promptValue"
                        :placeholder="$t('calendar.poster_dialog.prompt_placeholder')"
                        rows="4"
                    />
                </div>

                <div class="grid gap-2">
                    <Label for="poster-design-system-prompt">{{ $t('calendar.poster_dialog.system_prompt_label') }}</Label>
                    <Textarea
                        id="poster-design-system-prompt"
                        v-model="systemPromptValue"
                        :placeholder="$t('calendar.poster_dialog.system_prompt_placeholder')"
                        rows="4"
                    />
                </div>

                <div class="grid gap-2">
                    <Label>{{ $t('calendar.poster_dialog.mode_label') }}</Label>
                    <div class="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            :class="modeValue === 'single' ? 'bg-foreground text-background' : ''"
                            @click="modeValue = 'single'"
                        >
                            {{ $t('calendar.poster_dialog.single') }}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            :class="modeValue === 'bulk' ? 'bg-foreground text-background' : ''"
                            @click="modeValue = 'bulk'"
                        >
                            {{ $t('calendar.poster_dialog.bulk') }}
                        </Button>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button :loading="submitting" :disabled="!promptValue.trim()" @click="submit">
                    {{ $t('calendar.poster_dialog.submit') }}
                </Button>
                <Button variant="outline" @click="emit('update:modelValue', false)">
                    {{ $t('calendar.poster_dialog.cancel') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
