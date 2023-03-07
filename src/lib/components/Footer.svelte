<script>
        import Impressum from '$src/lib/components/Impressum.svelte';
        import { _siteName } from '$src/routes/+layout';
</script>

<footer class="clr-bg-invert clr-text-invert text-center py-4">
        <h4>{_siteName}</h4>

        <div id="content">
                <section id="impressum" class="footer-area">
                        <Impressum />
                </section>

                <section id="contact" class="footer-area">
                        <h4 class="grow">contact</h4>
                        <ul>
                                <!-- link opens in new tab-->
                                <li>
                                        e-mail:
                                        <a
                                                class="clr-text-primary"
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
        .footer-area {
                @apply w-64 m-8;
                @apply text-left;
        }

        ul {
                list-style-type: none;
                padding: 0px;
        }

        a {
                color: var(--color-text);
        }

        a:hover {
                color: var(--color-text);
        }

        .footer-area {
                width: 250px;
                /* display: inline-block; */
                text-align: left;
        }

        #title {
                text-align: center;
                margin: 16px;
        }

        #content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
        }

        #contact {
                text-align: left;
                margin-bottom: 16px;
        }

        @media only screen and (min-width: 768px) {
                #content {
                        height: 300px;
                        flex-direction: row;
                        justify-content: center;
                        align-items: flex-start;
                }
        }
</style>
