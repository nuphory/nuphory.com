<script lang="ts">
	import { _siteName, _siteDescription, _tagLine } from './+layout';

	/** @type {import('./$types').PageData} */
	export let data: [];
</script>

<svelte:head>
	<title>{_siteName}</title>
	<meta name="title" content="{_siteName} — {_tagLine}" />
	<meta
		name="keywords"
		content="{_siteName}, {_siteName}music, {_siteName} music, volant, volantmusic, music, house, trance, hypertrance, neoy2k, progressive house"
	/>
	<meta name="description" content={_siteDescription} />

	<link rel="canonical" href="https://nuphory.com" />

	<meta name="robots" content="index, follow" />

	<meta property="og:title" content="{_siteName} — {_tagLine}" />
	<meta property="og:description" content={_siteDescription} />
	<meta property="og:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
	<meta property="og:url" content="https://{_siteName}.com" />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@{_siteName}" />
	<meta name="twitter:creator" content="@{_siteName}" />
	<meta name="twitter:title" content="{_siteName} — {_tagLine}" />
	<meta name="twitter:description" content={_siteDescription} />
	<meta name="twitter:image" content="https://{_siteName}.com/assets/logo/png/summary.png" />
</svelte:head>

<section>
	<h1 class="title">{_siteName}</h1>
</section>

<section id="shop">
	<ul id="products">
		{#each data.products as product}
			<li>
				<a href="/shop/{product.sync_product.id}">
					<div class="showcase">
						<img src={product.sync_product.thumbnail_url} alt={product.sync_product.title} />
						<span class="price">{product.sync_variants[0].currency} {product.sync_variants[0].retail_price}</span>
					</div>
					<h4>{product.sync_product.name}</h4>
				</a>
				<button class="cart-button" onclick=""><span>Add to cart</span></button>
			</li>
		{/each}
	</ul>
</section>

<style>
	#products {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
	}

	#products li {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;

		position: relative;

		margin: 1rem;
		padding: 1rem;
		border-radius: 2rem;
		border: 1px solid var(--foreground-color);
	}

	.showcase {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;

		position: relative;
	}
	.showcase .price {
		position: absolute;
		right: 0.5rem;
		bottom: 0;
		transform: translate(0%, 33%);

		padding: 0.25rem 0.75rem;
		border: 3px solid var(--background-color);
		border-radius: 0.5rem;

		color: var(--background-color);
		background-color: var(--foreground-color);

		font-weight: 500;
		font-family: var(--font-monospace);
	}

	#products li a {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;
		text-decoration: none;
		color: var(--foreground-color);
	}

	#products li a:hover {
		text-decoration: underline;
	}

	#products li a img {
		width: 100%;
		max-width: 300px;
		height: auto;
		border-radius: 1rem;
	}

  #products li button {
		padding: 0.25rem 0.75rem;
		border: 3px solid var(--background-color);
		border-radius: 0.5rem;

		color: var(--background-color);
		background-color: var(--foreground-color);

		font-size: 1rem;
    font-weight: 500;
		font-family: var(--font-monospace);
    
    text-transform: uppercase;

    transition: transform 100ms ease-in-out, border-radius 100ms ease-in-out;
  }

  #products li button span {
    display:inline-block;

    transition: transform 100ms ease-in-out;
    transform: scale(1);
  }

  #products li button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  #products li button:hover span {
    transform: scale(calc(1/1.05));
  }

  #products li button:active {
    transform: scale(0.95);
  }
  #products li button:active span {
    transform: scale(1);
  }

  /* screen size */
  @media (min-width: 768px) {
    #products {
      flex-direction: row;
    }
  }
</style>
