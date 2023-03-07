<script lang="ts">
        export let label: string;
        export let href: string;
        export let Icon: any;
</script>

<a
        target="_blank"
        {href}
        rel="noreferrer"
        class="
                button
                flex justify-center items-center
                rounded-full
                
                hover:translate-x-1 sm:hover:translate-x-0
                hover:translate-y-0 sm:hover:-translate-y-1
                clr-bg-invert clr-text-invert 
                hover:opacity-80
                active:scale-95
        "
>
        {#if Icon}
                <Icon classList="w-12 h-12 aspect-square md:w-16 md:h-16" />
        {/if}
        <span class="font-yeysk text-left w-40 md:hidden clr-text-invert"
                >{label.toUpperCase()}</span
        >
</a>