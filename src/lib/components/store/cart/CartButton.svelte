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

                        displayCount(cartCount, cartIcon);
                }

                currentOrder.subscribe((order) => {
                        if (currentOrder.getItemCount() == itemCount) return;
                        itemCount = currentOrder.getItemCount();

                        // console.debug("items updated, new itemCount: ", itemCount);

                        if (browser) {
                                cartCount = document.querySelector(
                                        '#cart-button'
                                ) as HTMLSpanElement;
                                cartIcon = document.querySelector('#cart-icon') as HTMLImageElement;
                                cartDiv = document.querySelector('#cart-div') as HTMLDivElement;

                                displayCount(cartCount, cartIcon);

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

        function displayCount(cartCount: HTMLSpanElement, cartIcon: HTMLImageElement) {
                if (itemCount > 0) {
                        cartCount.classList.remove('w-0');
                        cartCount.classList.remove('h-0');
                        cartCount.classList.remove('m-0');
                        cartIcon.classList.add('mr-0');
                        cartCount.classList.add('w-[2em]');
                        cartCount.classList.add('h-[2em]');
                        cartCount.classList.add('m-[0.25em]');
                } else {
                        cartCount.classList.remove('w-[2em]');
                        cartCount.classList.remove('h-[2em]');
                        cartCount.classList.remove('m-[0.25em]');
                        cartIcon.classList.remove('mr-0');
                        cartCount.classList.add('w-0');
                        cartCount.classList.add('h-0');
                        cartCount.classList.add('m-0');
                }
        }
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
                        class="aspect-square h-[1.25em] m-[0.6em] opacity-100 transition-all duration-300 ease-in-out"
                />
                <span
                        id="cart-button"
                        class="
                                transition-all duration-300 ease-out
                                flex justify-center items-center
                                
                                overflow-clip
                                aspect-square w-0 h-0 m-0
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
                        @apply w-[2em] h-[2em] m-[0.25em];
                }
        }
</style>
