<script lang="ts">
        import { browser } from '$app/environment';
        import type { AnimationItem } from 'lottie-web';
        import { onMount } from 'svelte';

        export let classList: string = "";

        // export let href: string = "";
        export let onmouseover: any;
        export let fallback: any = onmouseover;
        export let onmouseleave: any = onmouseover;

        let state = 'stopped';
        let animation: AnimationItem;

        if (browser) {
                onMount(async () => {
                        const { default: web } = await import('lottie-web');

                        let lottieElement = document.querySelector('#lottie') as HTMLDivElement;

                        animation = web.loadAnimation({
                                container: lottieElement!,
                                animationData: fallback,
                                loop: false,
                                autoplay: false
                        });

                        lottieElement?.addEventListener('mouseover', () => {
                                animation.play();
                                setTimeout(() => {
                                        if (state === 'playing') return;
                                        if (state === 'stopping') return;
                                        animation.destroy();
                                        animation = web.loadAnimation({
                                                container: lottieElement!,
                                                animationData: onmouseover,
                                                loop: true,
                                                autoplay: true
                                        });
                                        state = 'playing';
                                }, animation.totalFrames * (1000 * animation.frameRate ** -1));
                        });
                        lottieElement?.addEventListener('mouseleave', () => {
                                setTimeout(() => {
                                        if (state === 'stopped') return;
                                        animation.destroy();
                                        animation = web.loadAnimation({
                                                container: lottieElement!,
                                                animationData: onmouseleave,
                                                loop: false,
                                                autoplay: true
                                        });
                                        setTimeout(() => {
                                                if (state === 'playing') return;
                                                animation.destroy();
                                                animation = web.loadAnimation({
                                                        container: lottieElement!,
                                                        animationData: fallback,
                                                        loop: false,
                                                        autoplay: false
                                                });
                                                state = 'stopped';
                                        }, (animation.totalFrames - animation.currentFrame) * (1000 * animation.frameRate ** -1));
                                        state = 'stopping';
                                }, (animation.totalFrames - animation.currentFrame) * (1000 * animation.frameRate ** -1));
                        });
                });
        }
</script>

<div id="lottie" class={classList}>
        {#if !animation}
                 <slot />
        {/if}
</div>

<style lang="scss">
        :global(.stroke-primary) {
                @apply transition-[stroke] duration-[var(--duration)] ease-out;
        }
</style>