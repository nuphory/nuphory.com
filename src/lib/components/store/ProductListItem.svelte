<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { CartItem } from '$lib/stores/cart';
	import type Product from '$lib/api/products/product';
	import type { SyncVariant } from '$lib/api/products/product';
	
	export let product: Product;

	let selectedVariant: SyncVariant;
	let selectVariant = (event) => {
		const cartButton = document.querySelector('.cart-button') as HTMLDivElement;

		selectedVariant = product.sync_variants.find(
			(variant: SyncVariant) => variant.id == event.target.value
		)!;

		if (cartButton.classList.contains('disabled')) {
			// remove .disabled class from cart button
			cartButton.classList.remove('disabled');
		}
	};

	let addToCart = (event) => {

		if (event.type != "click") {
			switch (event.key) {
				case "Enter":
					break;
				default:
					return;
			}
		}

		if (!selectedVariant) return;
		const item: CartItem = {
			variant: selectedVariant,
			product: product as Product,
			quantity: 1
		};
		cart.add(item);
	};
</script>

<li
	class="flex flex-col justify-center items-center clr-regular m-4 p-4 rounded-[2em] border-[3px]"
>
	<!-- <a href="/shop/{product.id}"> -->
	<div class="showcase relative flex flex-col justify-center items-center">
		<img
			src={product.sync_product.thumbnail_url}
			alt={product.sync_product.name}
			class="aspect-square w-full max-w-xs rounded-2xl border-[1px]"
		/>
		<span
			class="price absolute right-2 bottom-0 flex justify-center items-center py-1 px-3 translate-y-1/3 h-[2.5em] rounded-[0.5em] border-[3px] clr-bg clr-inverse font-mono"
		>
			{selectedVariant ? selectedVariant.retail_price : product.sync_variants[0].retail_price}
			{selectedVariant ? selectedVariant.currency : product.sync_variants[0].currency}
		</span>
	</div>
	<h4>{product.sync_product.name}</h4>

	<div class="product-selection flex flex-row justify-center items-center gap-4">
		<select
			class="h-[2.5em] rounded-[0.5em] border-[1px] clr-border clr-bg"
			name="variant"
			on:change={selectVariant}
		>
			<option value="0" disabled selected>Select your size</option>
			{#each product.sync_variants as variant}
				<option value={variant.id}>{variant.name}</option>
			{/each}
		</select>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<button
			class="	cart-button 
				flex justify-center items-center 
				aspect-square h-[2.5em] 
				rounded-[0.5em] 
				cursor-pointer  
				clr-bg clr-inverse 
				hover:scale-105 active:scale-95
				disabled"
			on:click={addToCart}
			on:keydown={addToCart}
			tabindex="0"
		>
			<img width="18px" height="18px" alt="add to cart" src="/assets/icons/cart-plus-solid.svg" />
		</button>
	</div>
</li>
