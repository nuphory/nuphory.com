<script lang="ts">
  import { siteName, tagLine } from './+layout';
  import { browser } from '$app/environment';

  import Footer from '$lib/components/Footer.svelte';

  import './styles.css';

  (async () => {
    if (!browser) return;

    // TODO Collapsible CustomElement
    // const CollapsibleElement = (await import('$lib/collapsible')).default;
    // customElements.define('collapsible', CollapsibleElement);

    let collapsibles = document.querySelectorAll('.collapsible');

    //
    collapsibles.forEach((collapsible) => {
      collapsible.addEventListener('click', () => {
        collapsible.classList.toggle('active');
        let content = collapsible.nextElementSibling as HTMLElement;
        if (!content) return;

        // toggle content maxheight
        if (content.style.maxHeight) {
          content.style.removeProperty('max-height');
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    const FadeElement = (await import('$lib/fade-in')).default;
    customElements.define('fade-in', FadeElement);
    FadeElement.fadeInAll(100);

    let easterEgg = (toggle = true) => {
      if (!toggle) return;
      let keyStream: string[] = [];
      let konamiCode: string[] = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'KeyB',
        'KeyA',
        'Enter'
      ];
      let easterEggState = false;
      let modal = document.getElementById('modal') as HTMLElement;

      window.addEventListener('keydown', (e) => {
        if (keyStream.length == 11) keyStream.shift();
        keyStream.push(e.code);

        if (easterEggState) {
          if (e.code === 'Escape' || e.code === 'KeyQ') {
            hideEasterEgg();
          }
        } else {
          if (compare(keyStream, konamiCode)) {
            showEasterEgg();
          }
        }
      });
      async function showEasterEgg() {
        modal.style.visibility = 'visible';
        modal.style.setProperty('pointer-events', 'auto');

        console.log(
          '%c— ᆺ —%c\n\n- mmmm... soup',
          'font-size: 6em;',
          'font-size: 3em; font-style: italic;'
        );
        easterEggState = true;
        modal.style.setProperty('opacity', '1');
        (modal.childNodes[0] as HTMLElement).style.setProperty('transform', 'translateY(0px)');
      }
      async function hideEasterEgg() {
        modal.style.visibility = 'hidden';
        modal.style.setProperty('pointer-events', 'none');

        console.log(
          '%c> ᆺ <%c\n\n- waaaaahhhhh!',
          'font-size: 6em;',
          'font-size: 3em; font-style: italic;'
        );
        easterEggState = false;
        modal.style.setProperty('opacity', '0');
        (modal.childNodes[0] as HTMLElement).style.setProperty('transform', 'translateY(32px)');
      }
      function compare(a: string | any[], b: string | any[]) {
        // if any array is a falsy value, return
        if (!a) return false;
        if (!b) return false;

        // compare lengths - can save a lot of time
        if (a.length != b.length) return false;

        for (var i = 0, l = a.length; i < l; i++) {
          // Check if we have nested arrays
          if (a[i] instanceof Array && b[i] instanceof Array) {
            // recurse into the nested arrays
            if (!a[i].equals(b[i])) return false;
          } else if (a[i] != b[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
          }
        }
        return true;
      }
      window.onclick = function (event) {
        if (!easterEggState) return;
        if (event.target == modal) {
          hideEasterEgg();
        }
      };
    };
  })();

  /**
   * website designed by patch: https://twitter.com/patchstep
   */
  console.log(
    `%c${siteName}%c\n\n\n${siteName}.com was made by %cPatch\n%chttps://twitter.com/patchstep`,
    "font-family: 'Yeysk'; font-size: 6em; font-weight: bold; text-stroke: 2px #272d3b; color: #fffaf7;",
    'font-size: 2em; color: #fffaf7;',
    'font-size: 2em; color: #fffaf7; font-weight: bold;',
    'font-size: 1em; color: #fffaf7; font-weight: bold;'
  );
</script>

<svelte:head>
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="194x194" href="/assets/favicon/favicon-194x194.png" />
  <link
    rel="icon"
    type="image/png"
    sizes="192x192"
    href="/assets/favicon/android-chrome-192x192.png"
  />
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
  <link rel="manifest" href="/assets/favicon/site.webmanifest" />
  <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#272d3b" />
  <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
  <meta name="apple-mobile-web-app-title" content="nuphory" />
  <meta name="application-name" content="nuphory" />
  <meta name="msapplication-TileColor" content="#272d3b" />
  <meta name="msapplication-TileImage" content="/assets/favicon/mstile-144x144.png" />
  <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml" />
  <meta name="theme-color" content="#fffaf7" />

  <meta property="og:site_name" content={siteName} />
</svelte:head>

<div id="svelte">
  <div id="modal">
    <img src="/assets/easter-egg/small-lark.png" alt="easter egg" />
  </div>
  <slot />
</div>

<footer>
  <Footer />
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--foreground-color);
    color: var(--background-color);
    padding: 16px 0px;
    width: 100%;
  }
  #modal {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    transition: opacity 1s ease, transform 1s ease, display 1s ease;
    position: absolute;
    opacity: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
  }

  #modal img {
    pointer-events: none;

    transition: opacity 1s ease, transform 1s ease;
    transform: translateY(32px);
    width: 70vw;
  }
  :global(fade-in) {
    opacity: 0.01;
  }

  #svelte {
    background-color: var(--background-color);
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 960px;
    min-height: 100vh;
    justify-content: center;
  }
</style>
