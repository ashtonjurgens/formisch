<script lang="ts">
  import type { FieldElementProps } from '@formisch/svelte';

  interface Props extends FieldElementProps {
    class?: string;
    label: string;
    value: string;
    checked: boolean;
  }

  let { label, checked, ...props }: Props = $props();
</script>

<label
  class="flex cursor-pointer items-center space-x-3 font-medium select-none md:text-lg lg:text-xl"
>
  <input
    {...props}
    class="h-4 w-4 cursor-pointer lg:h-5 lg:w-5"
    type="radio"
    {checked}
  />
  <span>{label}</span>
</label>
