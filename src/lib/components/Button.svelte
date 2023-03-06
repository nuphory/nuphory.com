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
                transition-all duration-300 ease-out
                flex justify-center items-center
                mx-[8px] my-[4px] rounded-full
                
                clr-bg-invert clr-text-invert 
                hover:translate-x-[-1px] md:hover:translate-x-0 md:hover:translate-y-[-1px] hover:opacity-80
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

<style>
        img {
                aspect-ratio: 1;
                height: 48px;
                width: 48px;
        }

        .button {
                /* margin: 4px 8px; */
                /* border-radius: 50vh; */
                /* display: flex;
                justify-content: center;
                align-items: center;
                background: var(--color-bg);
                color: var(--color-text); */
                text-decoration: none;
                /* transition: all 50ms ease-out; */
        }

        /* .button:hover {
                transform: translateY(-1px);
                opacity: 0.8;
        }

        .button:active {
                transform: scale(0.95);
        } */

        .button:visited {
                text-decoration: none;
        }

        /*.label {
                font-family: Yeysk, sans-serif;
                text-align: left;
                width: 160px;
        } */

        /* @media only screen and (min-width: 768px) {
                img {
                        height: 64px;
                        width: 64px;
                }
                .label {
                        display: none;
                }
        } */
</style>
