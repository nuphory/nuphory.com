<script lang="ts">
	export let product: any;

	export let selectedVariant = product.sync_variants[0];
	export let selectVariant = (event) => {
		selectedVariant = product.sync_variants[event.target.value];
	};

	// TODO add to cart
	
</script>

<li>
	<!-- <a href="/shop/{product.id}"> -->
	<div class="showcase">
		<img src={product.thumbnail_url} alt={product.name} />
		<span class="price badge">{selectedVariant.currency} {selectedVariant.retail_price}</span>
	</div>
	<h4>{product.name}</h4>
	<!-- </a> -->
	<div class="product-selection">
		<!-- dropdown with variants -->
		<select class="" name="variant" on:change={selectVariant}>
			{#each product.sync_variants as variant}
				<option value={variant.id}>{variant.name}</option>
			{/each}
		</select>
		<div class="cart-button badge">
			<img width="18px" height="18px" alt="add to cart" src="/assets/icons/cart-plus-solid.svg" />
		</div>
	</div>
</li>

<style>
	li,
	.showcase,
	.product-selection {
		display: flex;
		justify-content: center;
		align-items: center;

		flex-wrap: wrap;
	}

	li,
	.showcase {
		flex-direction: column;
	}

	.product-selection {
		flex-direction: row;
		justify-content: center;
		gap: 1em;
	}

	li {
		margin: 1rem;
		padding: 1rem;
		border-radius: 2rem;
		border: 3px solid var(--foreground-color);
	}

	.showcase {
		position: relative;
	}

	.showcase img {
		position: relative;
		width: 100%;
		max-width: 300px;
		height: auto;
		border-radius: 1rem;
		border: 1px solid var(--foreground-color);
	}

	.price {
		position: absolute;
		right: 0.5rem;
		bottom: 0;
		transform: translate(0%, 33%);

		padding: 0.25rem 0.75rem;
	}

	.cart-button {
		cursor: pointer;
		aspect-ratio: 1;
		display: flex;
		justify-content: center;
		align-items: center;

		transition: transform 100ms ease-in-out, border-radius 100ms ease-in-out;
	}

	.cart-button img {
		width: 1.5em;
		aspect-ratio: 1;

		border-radius: 0;

		transition: transform 100ms ease-in-out;
	}

	.cart-button:hover {
		cursor: pointer;
		transform: scale(1.05);
	}

	.cart-button:hover img {
		transform: scale(calc(1 / 1.05));
	}

	.cart-button:active {
		transform: scale(0.95);
	}
	.cart-button:active img {
		transform: scale(1);
	}

	select {
		cursor: pointer;
		height: 2.5em;
		background-color: var(--background-color);
		border: 1px solid var(--foreground-color);
		border-radius: 0.5rem;

		padding: 0.25rem 0.75rem;
	}

	select:active {
		background-color: var(--foreground-color);
		color: var(--background-color);
	}

	select:focus {
		background-color: var(--foreground-color);
		color: var(--background-color);
	}
</style>
