<script lang="ts">
        import Button from '$src/lib/components/Button.svelte';

        import type ButtonType from '$lib/assets/buttons/button';

        import streamButtons from '$src/lib/assets/buttons/streaming';
        import socialButtons from '$src/lib/assets/buttons/socials';
        import contactButtons from '$src/lib/assets/buttons/contact';

        const buttonsArray: ButtonType[][] = [streamButtons, socialButtons, contactButtons];
</script>

<div class="flex flex-col md:flex-row gap-2 md:order-1" id="stream-buttons">
        {#each streamButtons as { label, href, Icon }, i}
                <Button {label} {href}>
                        <Icon
                                classList="
                                        transition-colors duration-[var(--duration)] ease-out
                                        aspect-square w-12 h-12 md:w-16 md:h-16
                                        fill-secondary
                                "
                        />
                </Button>
        {/each}
</div>
<div class="flex flex-col md:flex-row gap-2 md:order-0" id="social-buttons">
        {#each socialButtons as { label, href, Icon }}
                <Button {label} {href}>
                        <Icon
                                classList="
                                        transition-colors duration-[var(--duration)] ease-out
                                        aspect-square w-12 h-12 md:w-16 md:h-16
                                        fill-secondary
                                "
                        />
                </Button>
        {/each}
</div>
<div class="flex flex-col md:flex-row gap-2 order-2" id="contact-buttons">
        {#each contactButtons as { label, href, Icon }}
                <Button {label} {href}>
                        <Icon
                                classList="
                                        transition-colors duration-[var(--duration)] ease-out
                                        aspect-square w-12 h-12 md:w-16 md:h-16
                                        fill-secondary
                                "
                        />
                </Button>
        {/each}
</div>
