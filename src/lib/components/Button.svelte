<script lang="ts">
        export let label: string;
        export let href: string;

</script>

<a
        target="_blank"
        {href}
        rel="noreferrer"
        class="
                transition-[color,background-color,transform,opacity] duration-[var(--duration)] ease-out
                button
                flex justify-center items-center
                rounded-full
                
                hover:translate-x-1 sm:hover:translate-x-0
                hover:translate-y-0 sm:hover:-translate-y-1
                bg-primary text-secondary 
                hover:opacity-80
                active:scale-95
        "
>
        <slot />

        <span class="font-yeysk text-left w-40 md:hidden clr-text-invert"
                >{label.toUpperCase()}</span
        >
</a>