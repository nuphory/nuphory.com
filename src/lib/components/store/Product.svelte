<script lang="ts">
	export let product: any;

	export let selectedVariant = product.sync_variants[0];
	export let selectVariant = (event) => {
		selectedVariant = product.sync_variants[event.target.value];
	};
</script>

<li>
	<!-- <a href="/shop/{product.id}"> -->
	<div class="showcase">
		<img src={product.thumbnail_url} alt={product.name} />
		<span class="price">{selectedVariant.currency} {selectedVariant.retail_price}</span>
	</div>
	<h4>{product.name}</h4>
	<!-- </a> -->
	<div class="product-selection">
		<!-- dropdown with variants -->
		<select name="variant" on:change={selectVariant}>
			{#each product.sync_variants as variant}
				<option value={variant.id}>{variant.name}</option>
			{/each}
		</select>
		<button class="cart-button"
			><img
				width="48px"
				height="48px"
				alt="add to cart"
				src="/assets/icons/cart-plus-solid.svg"
			/></button
		>
	</div>
</li>

<style>
	li {
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

	li a {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: wrap;
		text-decoration: none;
		color: var(--foreground-color);
	}

	li a:hover {
		text-decoration: underline;
	}

	/*  li a img {
		width: 100%;
		max-width: 300px;
		height: auto;
		border-radius: 1rem;
	} */

	li img {
		width: 100%;
		max-width: 300px;
		height: auto;
		border-radius: 1rem;
	}

	li button {
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

	li button span {
		display: inline-block;

		transition: transform 100ms ease-in-out;
		transform: scale(1);
	}

	li button:hover {
		cursor: pointer;
		transform: scale(1.05);
	}

	li button:hover span {
		transform: scale(calc(1 / 1.05));
	}

	li button:active {
		transform: scale(0.95);
	}
	li button:active span {
		transform: scale(1);
	}
</style>
