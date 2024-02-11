<script lang="ts">
        export let callback: () => void;
</script>

<button
        class="flex justify-center items-center w-min h-min rounded-full ring-1 ring-primary aspect-square {$$restProps.class}"
        id={$$restProps.id}
        on:click={callback}
>
        <slot />
</button>
