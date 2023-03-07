<script lang="ts">
        // TODO trigger header pagetitle check
        import { onMount } from 'svelte';
        import { fly } from 'svelte/transition';

        export let duration: number = 500;
        export let url: string;
        export let classList: string = '';

        let mounted: boolean = false;

        onMount(() => {
                mounted = true;
        });
</script>

{#if mounted}
        {#key url}
                <main
                        class={classList}
                        in:fly={{
                                x: -5,
                                duration: duration,
                                delay: duration
                        }}
                        out:fly={{ x: 5, duration: duration }}
                >
                        <slot />
                </main>
        {/key}
{/if}
