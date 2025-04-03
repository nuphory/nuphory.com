<script lang="ts">
        // import
        import site from '$lib/identity';
        import Impressum from '$src/lib/components/Impressum.svelte';
</script>

<svelte:head>
        <title>{site.name}</title>
        <meta name="title" content="{site.name} — {site.tagline}" />
        <meta
                name="keywords"
                content="{site.name}, {site.name}music, {site.name} music, volant, volantmusic, music, house, trance, hypertrance, neoy2k, progressive house"
        />
        <meta name="description" content={site.description} />

        <link rel="canonical" href="https://nuphory.com" />

        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="{site.name} — {site.tagline}" />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content="https://{site.name}.com/assets/logo/png/summary.png" />
        <meta property="og:url" content="https://{site.name}.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@{site.name}" />
        <meta name="twitter:creator" content="@{site.name}" />
        <meta name="twitter:title" content="{site.name} — {site.tagline}" />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content="https://{site.name}.com/assets/logo/png/summary.png" />
</svelte:head>

<section>
    <Impressum />
</section>