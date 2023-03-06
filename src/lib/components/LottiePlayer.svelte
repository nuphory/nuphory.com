<script lang="ts">
        import { browser } from '$app/environment';
        import { onMount } from 'svelte';

        import NuphoryLogo from './icons/NuphoryLogo.svelte';

        let width: number;
        let height: number;

        export let href: string | null = null;

        export let onmouseover: any;
        export let fallback: any = onmouseover;
        export let onmouseleave: any = onmouseover;
        export let Placeholder: any = NuphoryLogo;

        let state = 'stopped';

        if (browser) {
                onMount(async () => {
                        const { default: web } = await import('lottie-web');

                        let lottieElement = document.querySelector('#lottie') as HTMLDivElement;

                        let animation = web.loadAnimation({
                                container: lottieElement!,
                                animationData: fallback,
                                loop: false,
                                autoplay: false
                        });

                        document.querySelector('#placeholder')?.remove();

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

<div id="lottie" class="mx-auto translate-y-[-25%]">
        <Placeholder id="placeholder" />
</div>

<style lang="scss">
        #lottie {
                width: var(--player-width);
                height: var(--player-height);
        }

        :global(#headbop-tm-stroke),
        :global(#headbop-face-stroke),
        :global(#headbop-ellipse-stroke) {
                transition: all 300ms ease-out;
                stroke: var(--text-primary);
        }
</style>
