<script lang="ts">
        import { volume } from '$lib/api/stores/volume';
        // Euterpe
        import { db } from '$lib/assets/music/db';
        import { Euterpe, EuterpeBuilder } from '@euterpe.js/euterpe';

        let audioEl: HTMLAudioElement;
        let seekBar: HTMLDivElement;
        let euterpe: Euterpe;

        // Components
        import PlayerControl from './PlayerControl.svelte';

        // Animations
        import { fly } from 'svelte/transition';
        import { expoOut, expoIn } from 'svelte/easing';
        import { onMount } from 'svelte';

        let paused = true;

        // ephemeral object for previous button
        let ephObjPrev = {};

        // ephemeral object for next button
        let ephObjNext = {};

        // your script goes here

        function togglePlay() {
                euterpe.try_play_toggle().catch((err) => {
                        console.error(err);
                        euterpe.try_next_song_looping();
                });
        }

        function prev() {
                // empty ephemeral object to trigger fly transition on previous button
                ephObjPrev = {};

                if (euterpe.time > 5) seek(0);
                else euterpe.try_previous_song_looping();
        }
        function next() {
                // empty ephemeral object to trigger fly transition on previous button
                ephObjNext = {};

                euterpe.try_next_song_looping();
                // next song
        }
        function seek(seekTime: number, seekPercent?: number) {
                euterpe.seek(seekTime);

                if (!seekPercent) seekPercent = seekTime / euterpe.current_song_duration;

                seekBar.style.setProperty('--time-percent', `${seekPercent * 100}%`);
        }

        let previousTime = 0;
        const precision = 100;

        function timeTick(time: number) {
                if (paused) return;

                const currentTime = Math.round(time * precision) / precision;
                if (currentTime === previousTime) return;

                const duration = Math.round(euterpe.current_song_duration * precision) / precision;

                previousTime = Math.round(time * precision) / precision;

                const seekPercent = time / euterpe.current_song_duration;
                seekBar.style.setProperty('--time-percent', `${seekPercent * 100}%`);
        }

        function keyControls(event: KeyboardEvent) {
                switch (event.key) {
                        case ' ':
                                togglePlay();
                                event.preventDefault();
                                break;
                        case 'ArrowLeft':
                                prev();
                                event.preventDefault();
                                break;
                        case 'ArrowRight':
                                next();
                                event.preventDefault();
                                break;
                }
        }

        onMount(() => {
                euterpe = new EuterpeBuilder(audioEl, db, {
                        use_only_pathname_url: true
                }).build();

                volume.subscribe((value) => {
                        euterpe.volume = value.muted ? 0 : value.volume;
                });

                euterpe.try_preload_song(0).then(() => {
                        db.songs.forEach((song) => {
                                console.log(euterpe.current_song_id, song.id, song.id === euterpe.current_song_id)
                                if (song.id === euterpe.current_song_id)
                                        euterpe.try_queue_add(song.id!);
                        });
                        console.log(euterpe.queue);
                });

                euterpe.on_time_tick(timeTick);

                audioEl.addEventListener('play', () => {
                        paused = false;
                });
                audioEl.addEventListener('pause', () => {
                        paused = true;
                });

                window.addEventListener('keydown', keyControls);
        });
</script>

<audio bind:this={audioEl} id="euterpe__audio-el" class="hidden" />

<div
        class="flex justify-center items-center gap-4 w-full bg-secondary relative group mt-16 [&_#euterpe\_\_seek-bar]:hover:h-24"
>
        <div
                bind:this={seekBar}
                id="euterpe__seek-bar"
                class="
                        w-full
                        ring-1 ring-primary
                        bg-secondary

                        cursor-pointer

                        transition-quick duration-[var(--duration)] ease-in-out
                        after:transition-quick after:duration-[var(--duration)] after:ease-out

                        h-12

                        after:absolute after:bottom-0 after:left-0 after:block after:content-[''] after:w-[var(--time-percent,0%)] after:h-full after:bg-primary
                "
                on:click={(event) => {
                        const seekPercent = event.offsetX / seekBar.clientWidth;
                        const seekTime = euterpe.current_song_duration * seekPercent;

                        seek(seekTime, seekPercent);
                }}
                on:keypress={() => {}}
        />
        <div
                id="euterpe__controls"
                class="flex gap-4 items-center absolute bottom-4 [&>*]:bg-secondary"
        >
                <PlayerControl
                        id="euterpe__controls__prev"
                        class="p-6 [&>svg]:absolute transition-quick duration-[var(--duration)] ease-out"
                        callback={prev}
                >
                        {#key ephObjPrev}
                                <svg
                                        out:fly={{ duration: 250, x: -10, easing: expoOut }}
                                        in:fly={{
                                                delay: 50,
                                                duration: 250,
                                                x: 10,
                                                easing: expoOut
                                        }}
                                        class="-translate-x-[0.125rem]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="2rem"
                                        height="2rem"
                                        viewBox="0 0 24 24"
                                >
                                        <path
                                                fill="currentColor"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="0.5"
                                                d="m11 19l-9-7l9-7zm11 0l-9-7l9-7z"
                                        />
                                </svg>
                        {/key}
                </PlayerControl>
                <PlayerControl
                        id="euterpe__controls__play"
                        class="p-8 [&>svg]:absolute transition-quick duration-[var(--duration)] ease-out"
                        callback={togglePlay}
                >
                        {#if paused}
                                <svg
                                        transition:fly={{ duration: 250, x: 10, easing: expoOut }}
                                        class="translate-x-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3rem"
                                        height="3rem"
                                        viewBox="0 0 24 24"
                                >
                                        <path
                                                fill="currentColor"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="0.5"
                                                d="m5 3l14 9l-14 9z"
                                        />
                                </svg>
                        {:else}
                                <svg
                                        transition:fly={{ duration: 250, x: -10, easing: expoOut }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="3rem"
                                        height="3rem"
                                        viewBox="0 0 24 24"
                                >
                                        <path
                                                fill="currentColor"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="0.5"
                                                d="M6 4h4v16H6zm8 0h4v16h-4z"
                                        />
                                </svg>
                        {/if}
                </PlayerControl>
                <PlayerControl
                        id="euterpe__controls__next"
                        class="p-6 [&>svg]:absolute transition-quick duration-[var(--duration)] ease-out"
                        callback={next}
                >
                        {#key ephObjNext}
                                <svg
                                        out:fly={{ duration: 250, x: 10, easing: expoOut }}
                                        in:fly={{
                                                delay: 50,
                                                duration: 250,
                                                x: -10,
                                                easing: expoOut
                                        }}
                                        class="translate-x-[0.125rem]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="2rem"
                                        height="2rem"
                                        viewBox="0 0 24 24"
                                >
                                        <path
                                                fill="currentColor"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="0.5"
                                                d="m13 19l9-7l-9-7zm-11 0l9-7l-9-7z"
                                        />
                                </svg>
                        {/key}
                </PlayerControl>
        </div>
</div>
