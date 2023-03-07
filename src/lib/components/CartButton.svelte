<script lang="ts">
        import CartIcon from '$src/lib/components/icons/CartIcon.svelte';

        import _ from 'lodash';
        import { browser } from '$app/environment';

        import currentOrder from '$lib/api/stores/order';
        import { onMount } from 'svelte';

        let itemCount: number = currentOrder.getItemCount();

        let cartCount: HTMLSpanElement;
        let cartIcon: HTMLImageElement;
        let cartDiv: HTMLDivElement;

        onMount(() => {
                if (browser) {
                        cartCount = document.querySelector('#cart-button') as HTMLSpanElement;
                        cartIcon = document.querySelector('#cart-icon') as HTMLImageElement;
                        cartDiv = document.querySelector('#cart-div') as HTMLDivElement;

                        // displayCount(cartCount, cartIcon);
                }

                currentOrder.subscribe((order) => {
                        if (currentOrder.getItemCount() == itemCount) return;
                        itemCount = currentOrder.getItemCount();

                        if (browser) {
                                cartCount = document.querySelector(
                                        '#cart-button'
                                ) as HTMLSpanElement;
                                cartIcon = document.querySelector('#cart-icon') as HTMLImageElement;
                                cartDiv = document.querySelector('#cart-div') as HTMLDivElement;

                                cartDiv.classList.add('ease-out');
                                cartDiv.classList.remove('ease-in');
                                cartDiv.classList.add('translate-y-[-1em]');
                                cartDiv.classList.add('scale-105');

                                setTimeout(() => {
                                        cartDiv.classList.add('ease-in');
                                        cartDiv.classList.remove('ease-out');
                                        cartDiv.classList.remove('translate-y-[-1em]');
                                        cartDiv.classList.remove('scale-105');
                                }, 300);
                        }
                });
        });
</script>

<a
        id="cart-div"
        href="/cart"
        class="
                        flex justify-center items-center

                        ml-auto
                        w-fit
                        h-[2.5em] min-w-[2.5em]
                        rounded-full
                        
                        clr-bg-invert clr-text-invert
                        
                        font-mono
                        cursor-pointer
                        
                        hover:scale-105
                        active:scale-95
                "
>
        <CartIcon {itemCount} />
        <span
                id="cart-button"
                class:item-count={itemCount > 0}
                class="
                                transition-all duration-300 ease-out
                                flex justify-center items-center
                                
                                overflow-clip
                                rounded-full

                                clr-bg-primary clr-text-primary
                        "
        >
                {itemCount}
        </span>
</a>

<style lang="scss">
        a:hover {
                :global(svg) {
                        @apply mr-0;
                }
                span {
                        @apply max-w-full min-w-[2em] h-[2em] m-1 px-2;
                }
        }

        span.item-count {
                @apply max-w-full min-w-[2em] h-[2em] m-1 px-2;
        }
        span {
                @apply max-w-0 min-w-0 h-0 m-0 px-0;
        }
</style>
