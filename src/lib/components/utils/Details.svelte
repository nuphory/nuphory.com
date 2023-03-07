<script lang="ts">
        export let classList = '';
</script>

<details class="relative group {classList} open:pb-1">
        <summary
                class=" 
                        inline-block
                        
                        w-full
                        cursor-pointer

                        group-open:bg-[var(--background-primary)] 
                        group-open:text-[var(--text-primary)]

                        [&>*:first-child]:select-none
                        [&>*:first-child]:before:inline-block
                        [&>*:first-child]:before:content-['▶']
                        [&>*:first-child]:before:mr-2
                        [&>*:first-child]:before:group-open:rotate-90
                        [&>*:first-child]:before:group-open:translate-y-[3px]
                "
        >
                <slot name="summary" />
        </summary>
        <slot name="content"/>
</details>

<style lang="scss">
        details {
                summary {
                        &::-webkit-details-marker {
                                display: none;
                        }
                }
        }
</style>
