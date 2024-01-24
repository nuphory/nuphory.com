<script>
        import Impressum from '$src/lib/components/Impressum.svelte';
        import site from '$lib/identity';
</script>

<footer
        id="booking"
        class="
                transition-colors duration-[var(--duration)] ease-out
                bg-primary text-secondary text-center py-4
        "
>
        <h4 id="booking-btt">{site.name}</h4>

        <div
                id="content"
                class="
                        flex flex-col justify-start items-center 
                        sm:flex-row sm:justify-center sm:items-start
                        min-h-[26rem] sm:min-h-[20rem]
                "
        >
                <section id="contact" class="w-64 m-8 text-left sm:order-2">
                        <h4 class="grow">contact</h4>
                        <ul class="list-none">
                                <!-- link opens in new tab-->
                                <li>
                                        e-mail:
                                        <a href="mailto:nuphory@gmail.com" target="_blank">
                                                nuphory@gmail.com
                                        </a>
                                </li>
                        </ul>
                </section>
                <section id="impressum" class="w-64 m-8 text-left sm:order-1">
                        <Impressum />
                </section>
        </div>

        <div role="separator" class="!border-secondary" />

        <div class="my-4 flex justify-center gap-3">
                <span>
                        © 2022-{new Date().getFullYear()} nuphory
                </span>
                •
                <span>
                        made by
                        <a href="https://twitter.com/patchstep" rel="noreferrer" target="_blank">
                                patch
                        </a>
                </span>
        </div>
</footer>
