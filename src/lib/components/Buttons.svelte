<script lang="ts">
        import Button from '$src/lib/components/Button.svelte';

        import type ButtonType from '$lib/assets/buttons/button';

        import streamButtons from '$src/lib/assets/buttons/streaming';
        import socialButtons from '$src/lib/assets/buttons/socials';
        import contactButtons from '$src/lib/assets/buttons/contact';

        const buttonsArray: ButtonType[][] = [streamButtons, socialButtons, contactButtons];
</script>

<div class="flex flex-col md:flex-row gap-2" id={`stream-buttons`}>
        {#each streamButtons as { label, href, img }, i}
                <Button {label} {href} Icon={img} />
        {/each}
</div>
<div class="flex flex-col md:flex-row gap-2" id={`social-buttons`}>
        {#each socialButtons as { label, href, img }}
                <Button {label} {href} Icon={img} />
        {/each}
</div>
<div class="flex flex-col md:flex-row gap-2" id={`contact-buttons`}>
        {#each contactButtons as { label, href, img }}
                <Button {label} {href} Icon={img} />
        {/each}
</div>

<style>
        #stream-buttons {
                order: 0;
        }
        #social-buttons {
                order: 1;
        }
        #contact-buttons {
                order: 2;
        }

        @media only screen and (min-width: 768px) {
                .buttons {
                        flex-direction: row;
                }
                #stream-buttons {
                        order: 1;
                }
                #social-buttons {
                        order: 0;
                }
        }
</style>
