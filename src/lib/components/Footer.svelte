<script>
        import Impressum from '$src/lib/components/Impressum.svelte';
        import { _siteName } from '$src/routes/+layout';
</script>

<footer id="booking" class="clr-bg-invert clr-text-invert text-center py-4">
        <h4 id="booking-btt">{_siteName}</h4>

        <div id="content" class="flex flex-col justify-center items-center sm:flex-row sm:items-start">
                <section id="impressum" class="w-64 m-8 text-left">
                        <Impressum />
                </section>

                <section id="contact" class="w-64 m-8 text-left">
                        <h4 class="grow">contact</h4>
                        <ul class="list-none">
                                <!-- link opens in new tab-->
                                <li>
                                        e-mail:
                                        <a
                                                class="clr-text-invert"
                                                href="mailto:nuphory@gmail.com"
                                                target="_blank"
                                        >
                                                nuphory@gmail.com
                                        </a>
                                </li>
                        </ul>
                </section>
        </div>

        <div role=separator class="clr-border-invert"></div>

        <div id="copyright" class="my-4 text-center">© 2022-{(new Date()).getFullYear()} nuphory</div>
</footer>

<style>


</style>
