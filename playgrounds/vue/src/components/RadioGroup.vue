<script setup lang="ts">
import type { FieldElementProps } from '@formisch/vue';
import InputErrors from './InputErrors.vue';
import InputLabel from './InputLabel.vue';
import Radio from './Radio.vue';

interface RadioGroupProps {
  class?: string;
  label?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  errors: [string, ...string[]] | null;
  props: FieldElementProps;
}

const props = defineProps<RadioGroupProps>();
const model = defineModel<string | undefined>({ required: true });
</script>

<template>
  <fieldset
    :class="['px-8 lg:px-10', props.class]"
    :aria-invalid="!!errors"
    :aria-errormessage="`${props.props.name}-error`"
  >
    <InputLabel component="legend" :label="label" :required="required" />
    <div
      class="flex flex-wrap gap-6 rounded-2xl border-2 border-slate-200 p-6 lg:gap-10 lg:p-10 dark:border-slate-800"
    >
      <Radio
        v-for="option in options"
        :key="option.value"
        v-model="model"
        :props="props.props"
        :label="option.label"
        :value="option.value"
      />
    </div>
    <InputErrors :name="props.props.name" :errors="errors" />
  </fieldset>
</template>
