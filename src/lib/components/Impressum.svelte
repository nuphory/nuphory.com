<script>
        import Details from './utils/Details.svelte';
</script>

<Details classList="group rounded-3xl outline outline-1 overflow-clip">
        <h4
                slot="summary"
                class="
                        transition-[transform] duration-300 ease-out
                        px-4 pt-2 pb-3
                        w-full
                        m-0
                        hover:-translate-y-1 active:translate-y-1
                "
        >
                Impressum
        </h4>
        <ul slot="content" class="mx-4 my-2">
                <h5 class="mt-0">Thomas Jisa</h5>
                <li>Hypertrance e.U.</li>
                <li>Musician and Graphic Design</li>
                <li>3701 Grossweikersdorf</li>
                <li>Unterthern 60</li>
                <li>AUSTRIA</li>
        </ul>
</Details>
