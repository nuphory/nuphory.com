<script>
        import Impressum from '$lib/components/layout/Impressum.svelte';
</script>

<div id="title"><h4>nuphory</h4></div>

<div id="content">
        <section id="impressum" class="footer-area">
                <Impressum />
        </section>

        <section id="contact" class="footer-area">
                <h4 class="grow">contact</h4>
                <ul>
                        <!-- link opens in new tab-->
                        <li>
                                e-mail: <a href="mailto:nuphory@gmail.com" target="_blank"
                                        >nuphory@gmail.com</a
                                >
                        </li>
                </ul>
        </section>
</div>

<div id="copyright">© 2022 nuphory</div>

<style>
        .footer-area {
                @apply w-64;
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

        #copyright {
                border-top: 1px solid var(--color-text);
                text-align: center;
                padding-top: 16px;
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
