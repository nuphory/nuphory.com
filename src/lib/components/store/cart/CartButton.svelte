<script lang="ts">
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

<div
        id="cart-div"
        class="
                transition-all duration-300 ease-out
                m-4
                "
>
        <!-- flex justify-center items-center -->
        <a
                href="/cart"
                class="
                        transition-all duration-300 ease-out
                        flex justify-center items-center

                        h-[2.5em] min-w-[2.5em]
                        rounded-full 
                        
                        clr-inverse clr-bg clr-text
                        
                        font-mono
                        cursor-pointer
                        
                        hover:scale-105
                        active:scale-95
                "
        >
                <img
                        id="cart-icon"
                        src="/assets/icons/cart-shopping-solid.svg"
                        alt="cart"
                        class:item-count={itemCount > 0}
                        class="
                                transition-all duration-300 ease-out
                                aspect-square 
                                h-[1.25em] m-[0.6em] 
                                opacity-100 
                        "
                />
                <span
                        id="cart-button"
                        class:item-count={itemCount > 0}
                        class="
                                transition-all duration-300 ease-out
                                flex justify-center items-center
                                
                                overflow-clip
                                rounded-full

                                clr-regular clr-bg clr-text
                        ">{itemCount}</span
                >
        </a>
</div>

<style lang="scss">
        a:hover {
                img {
                        @apply mr-0;
                }
                span {
                        @apply max-w-full min-w-[2em] h-[2em] m-1 px-2;
                }
        }

        img.item-count {
                @apply mr-0;
        }
        span.item-count {
                @apply max-w-full min-w-[2em] h-[2em] m-1 px-2;
        }
        span {
                @apply max-w-0 min-w-0 h-0 m-0 px-0;
        }
</style>
