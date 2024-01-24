<script lang="ts">
        import { browser } from '$app/environment';
        import { theme, changeTheme } from '$lib/api/stores/theme';

        function preventScroll(event: Event) {
                const label = event.target as HTMLLabelElement;

                event.preventDefault();

                if (event.type === 'keydown') {
                        const key = event as KeyboardEvent;
                        if (key.key !== 'Enter' && key.key !== 'Space') return;
                }

                (document.querySelector(`#${label.getAttribute('for')}`) as HTMLElement)?.click();
        }
</script>

<div class="relative flex items-center gap-2">
        <label
                for="theme-toggle"
                class="
                        relative z-10
                        inline-block

                        aspect-square w-[2.5em]
                        rounded-full

                        cursor-pointer
                        hover:scale-105
                        focus-within:scale-105
                        bg-primary

                        [&>figure]:hover:scale-[85%]
                        [&>figure]:focus-within:scale-[85%]
                "
                on:click={preventScroll}
                on:keydown={preventScroll}
        >
                <input
                        id="theme-toggle"
                        type="checkbox"
                        class="w-0 h-0 opacity-0"
                        value={$theme}
                        on:click={() => changeTheme()}
                />
                <figure
                        class="
                                absolute
                                left-1/2 top-1/2
                                translate-x-[-50%] translate-y-[-50%]

                                h-[2em] w-[2em]
                                rounded-full

                                overflow-clip
                                bg-secondary
                        "
                >
                        <div
                                class="
                                        absolute
                                        right-1/2 bottom-1/2
                                        scale-75 translate-x-1/2 translate-y-1/2

                                        h-[1.5em] w-[1.5em]
                                        rounded-full
                                        bg-primary
                                "
                        />

                        <div
                                class="
                                        absolute
                                        right-1/2 bottom-1/2
                                        translate-x-1/2 translate-y-1/2

                                        h-[1.5em] w-[1.5em]
                                        rounded-full

                                        group-data-[theme='light']:opacity-50
                                        bg-primary
                                "
                        />

                        <div
                                class="
                                        absolute
                                        h-[1.5em] w-[1.5em]
                                        rounded-full
                                        bg-secondary

                                        group-data-[theme='dark']:left-[35%] group-data-[theme='dark']:-top-[5%]
                                        group-data-[theme='light']:left-full group-data-[theme='light']:-top-[25%]
                                "
                        />
                </figure>
        </label>

        <a
                href="/"
                class="
                        -translate-x-full sm:translate-x-0
                        max-h-6
                        max-w-0 sm:max-w-full
                        opacity-0 sm:opacity-100
                        overflow-clip

                        font-bold
                        hover:scale-100 active:scale-95 hover:no-underline
                "
        >
                <ul
                        class="
                                block
                                translate-y-0

                                group-data-[theme='dark']:-translate-y-6   group-data-[theme='dark']:hover:translate-y-0
                                group-data-[theme='light']:-translate-y-12 group-data-[theme='light']:hover:-translate-y-[4.5em]
                        "
                >
                        <li>nuphory</li>
                        <li>::darkmode</li>
                        <li>::lightmode</li>
                        <li>nuphory</li>
                </ul>
        </a>
</div>

<style lang="scss">
        label {
                @apply transition-quick duration-[var(--duration)] ease-in-out;
                * {
                        @apply transition-quick duration-1000 ease-in-out;
                        &:not(input) {
                                @apply pointer-events-none;
                        }
                }
        }
</style>
