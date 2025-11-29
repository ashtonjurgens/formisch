<script setup lang="ts">
import { computed } from 'vue';

type InputLabelProps = {
  component?: 'label' | 'legend' | 'div';
  name?: string;
  label?: string;
  required?: boolean;
  margin?: 'none';
};

const props = defineProps<InputLabelProps>();

const element = computed(
  () => props.component ?? (props.name ? 'label' : 'div')
);
</script>

<template>
  <component
    v-if="label"
    :is="element"
    :class="[
      'inline-block font-medium md:text-lg lg:text-xl',
      { 'mb-4 lg:mb-5': !margin },
    ]"
    :for="element === 'label' ? name : undefined"
  >
    {{ label }}
    <span v-if="required" class="ml-1 text-red-600 dark:text-red-400">*</span>
  </component>
</template>
