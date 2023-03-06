<script lang="ts">
        import { fly } from 'svelte/transition';

        export let duration: number = 500;
        export let url: string = '';
</script>

{#key url}
        <div
                in:fly={{
                        x: -5,
                        duration: duration,
                        delay: duration
                }}
                out:fly={{ x: 5, duration: duration }}
        >
                <slot />
        </div>
{/key}
