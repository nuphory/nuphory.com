<script lang="ts">
        // Components
        import LottiePlayer from '../utils/LottiePlayer.svelte';

        // Lottie animations
        // import intro from '$lib/assets/lottie/intro.json';
        // import headbang from '$lib/assets/lottie/headbang.json';
        // import settle from '$lib/assets/lottie/settle.json';
        import headbop from '$lib/assets/lottie/headbop.json';

        export let classList: string = '';
</script>

<LottiePlayer {classList} onmouseover={headbop}>
        <svg class={classList} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                ><defs
                        ><style>
                                .a,
                                .b,
                                .c {
                                        fill: none;
                                        stroke-width: var(--d);
                                        stroke-linecap: round;
                                        stroke-linejoin: round;
                                }
                                .b {
                                        --d: 15px;
                                }
                                .c {
                                        --d: 1.6px;
                                }
                        </style></defs
                ><circle class="a" cx="256" cy="256" r="255" /><path
                        class="b"
                        d="M362.5 283.5h100"
                /><path class="b" d="M49.5 283.5h100" /><path
                        class="b"
                        d="M313.61 327.5c-13.28-1.04-47.84-21.78-57.61-37-9.77 15.22-45.22 35.96-58.5 37"
                /><path class="c" d="M489.84 261.5v-8l-4 6.5-4-6.5v8" /><path
                        class="c"
                        d="M479.34 253.5h-7"
                /><path class="c" d="M475.84 261.5v-8" /></svg
        >
</LottiePlayer>