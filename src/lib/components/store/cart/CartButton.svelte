<script lang="ts">
        import _ from 'lodash';
        import { browser } from '$app/environment';

        import currentOrder from '$lib/api/stores/order';

        let itemCount: number = currentOrder.getItemCount();

        currentOrder.subscribe((order) => {
                itemCount = currentOrder.getItemCount();
                
                console.debug("items updated, new itemCount: ", itemCount);

                if (browser) {
                        let cartIcon = document.querySelector('#cart-icon') as HTMLElement;
                        cartIcon.classList.add('ease-out');
                        cartIcon.classList.remove('ease-in');
                        cartIcon.classList.add('translate-y-[-1em]');
                        cartIcon.classList.add('scale-105');

                        setTimeout(() => {
                                cartIcon.classList.add('ease-in');
                                cartIcon.classList.remove('ease-out');
                                cartIcon.classList.remove('translate-y-[-1em]');
                                cartIcon.classList.remove('scale-105');
                        }, 300);
                }
        });
</script>

<div
        id="cart-icon"
        class="aspect-square h-[2.5em] w-[2.5em] flex justify-center items-center m-4 transition-all duration-300 ease-out"
>
        <a
                href="/cart"
                class=" absolute
                        flex justify-center items-center grow
                        aspect-square h-[2.5em] w-[2.5em]
                        rounded-full border-[1.25em]
                        cursor-pointer
                        clr-bg clr-text
                        font-mono
                        transition-all duration-300 ease-in-out
                        hover:scale-105 hover:border-[3px]
        
                        active:scale-95
                        disabled"
        >
                <span
                        id="cart-button"
                        class="absolute z-10 opacity-0 clr-regular clr-text transition-all duration-300 ease-in-out"
                        >{itemCount}</span
                >
        </a>
        <img
                src="/assets/icons/cart-shopping-solid.svg"
                alt="cart"
                class="z-50 absolute pointer-events-none aspect-square h-[1.25em] opacity-100 transition-all duration-300 ease-in-out"
        />
</div>

<style>
        a:hover #cart-button {
                opacity: 1;
        }

        a:hover + img {
                opacity: 0;
        }
</style>
