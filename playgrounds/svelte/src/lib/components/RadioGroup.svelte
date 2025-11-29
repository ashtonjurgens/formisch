<script lang="ts">
  import type { FieldElementProps } from '@formisch/svelte';
  import InputErrors from './InputErrors.svelte';
  import InputLabel from './InputLabel.svelte';
  import Radio from './Radio.svelte';

  interface Props extends FieldElementProps {
    class?: string;
    label?: string;
    options: { label: string; value: string }[];
    required?: boolean;
    input: string | undefined;
    errors: [string, ...string[]] | null;
  }

  let {
    class: className,
    label,
    name,
    options,
    required,
    input,
    errors,
    ...fieldProps
  }: Props = $props();
</script>

<fieldset class={['px-8 lg:px-10', className]}>
  <InputLabel component="legend" {label} {required} />
  <div
    class="flex flex-wrap gap-6 rounded-2xl border-2 border-slate-200 p-6 lg:gap-10 lg:p-10 dark:border-slate-800"
  >
    {#each options as { label, value } (value)}
      <Radio {...fieldProps} {name} {label} {value} checked={input === value} />
    {/each}
  </div>
  <InputErrors {name} {errors} />
</fieldset>
