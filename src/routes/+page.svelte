<script lang="ts">
  // components
  import LottiePlayer from '$lib/components/LottiePlayer.svelte';
  import Buttons from '$lib/components/Buttons.svelte';

  // constants
  import { siteName, siteDescription, tagLine } from './+layout';

  // lottie animations
  import intro from '$lib/assets/lottie/intro.json';
  import headbang from '$lib/assets/lottie/headbang.json';
  import settle from '$lib/assets/lottie/settle.json';
</script>

<svelte:head>
  <title>{siteName}</title>
  <meta name="title" content="{siteName} — {tagLine}" />
  <meta
    name="keywords"
    content="{siteName}, {siteName}music, {siteName} music, volant, volantmusic, music, house, trance, hypertrance, neoy2k, progressive house"
  />
  <meta name="description" content="{siteDescription}" />

  <link rel="canonical" href="https://nuphory.com" />

  <meta name="robots" content="index, follow" />

  <meta property="og:title" content="{siteName} — {tagLine}" />
  <meta property="og:description" content="{siteDescription}" />
  <meta property="og:image" content="https://{siteName}.com/assets/logo/png/summary.png" />
  <meta property="og:url" content="https://{siteName}.com" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@{siteName}" />
  <meta name="twitter:creator" content="@{siteName}" />
  <meta name="twitter:title" content="{siteName} — {tagLine}" />
  <meta name="twitter:description" content="{siteDescription}" />
  <meta name="twitter:image" content="https://{siteName}.com/assets/logo/png/summary.png" />
</svelte:head>

<main class="index">
  <section id="cover">
    <div style="max-height:0;overflow:hidden">nuphory is an artist that makes HYPERTRANCE and NEOY2K music and art. Check out all of her socials below!</div>
    <div id="hero">
      <fade-in id="logo" duration="500ms" order="0">
        <LottiePlayer
          --player-width="{1080 * (320 * 1080 ** -1)}px"
          --player-height="{240 * (320 * 1080 ** -1)}px"
          fallback={intro}
          onmouseover={headbang}
          onmouseleave={settle}
        />
      </fade-in>
      <fade-in id="title" distance="10px" duration="500ms" order="-1">
        <b><h1>{siteName}</h1></b>
      </fade-in>
      <div id="buttons">
        <Buttons />
      </div>
    </div>
    <fade-in id="book-me" distance="10px" duration="500ms" order="15">
      <a href="#contact" id="book-me-link">
        <h4>book me</h4>
        <h4>v</h4>
      </a>
    </fade-in>
  </section>
  <section id="posts" />
</main>

<style>
  /* :global(fade-in) {
    opacity: 0;
    transform: translateY(10px);
  } */

  #book-me-link:hover {
    text-decoration: none;
  }
  #cover {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0px;
  }
  #hero {
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    align-items: center;
    justify-content: center;
    padding: 16px 0px;
  }
  #buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #book-me {
    text-align: center;
    padding: 16px 0px;
  }

  #book-me h4 {
    margin: 0px;
  }
  #book-me h4:nth-child(2) {
    margin-bottom: 16px;
  }
</style>
