<script lang="ts">
  interface Props {
    component?: 'label' | 'legend' | 'div';
    name?: string;
    label?: string;
    required?: boolean;
    margin?: 'none';
  }

  let { component, name, label, required, margin }: Props = $props();

  const element = $derived(component ?? (name ? 'label' : 'div'));
</script>

{#if label}
  <svelte:element
    this={element}
    class={[
      'inline-block font-medium md:text-lg lg:text-xl',
      {
        'mb-4 lg:mb-5': !margin,
      },
    ]}
    for={element === 'label' ? name : undefined}
  >
    {label}
    {#if required}
      <span class="ml-1 text-red-600 dark:text-red-400">*</span>
    {/if}
  </svelte:element>
{/if}
