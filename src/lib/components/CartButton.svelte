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

        let jumping: boolean;

        onMount(() => {
                currentOrder.subscribe((order) => {
                        if (currentOrder.getItemCount() == itemCount) return;
                        itemCount = currentOrder.getItemCount();

                        jumping = true;
                        setTimeout(() => {
                                jumping = false;
                        }, 300);
                });
        });
</script>

<a
        id="cart-div"
        href="/cart"
        class="
                transition-quick duration-[var(--duration)] ease-out
                flex justify-center items-center
                hover:scale-105 active:scale-95 hover:translate-y-0
                {jumping ? 'ease-out -translate-y-4 scale-105' : 'ease-in'}

                h-[2.5em] min-w-[2.5em]
                w-fit
                rounded-full

                ml-auto
                
                bg-primary
                
                font-mono
                cursor-pointer

                [&>svg]:hover:mr-0
                [&>span]:hover:h-[2em] 
                [&>span]:hover:max-w-[2em] [&>span]:hover:min-w-[2em] 
                [&>span]:hover:m-1 [&>span]:hover:px-2
        "
>
        <CartIcon
                classList="
                        transition-[fill,margin] duration-[var(--duration)] ease-out
                        aspect-square h-[1.25em] 
                        m-[0.6em] 
                        fill-secondary
                        opacity-100 
                "
                {itemCount}
        />
        <span
                id="cart-button"
                class="
                        transition-quick duration-[var(--duration)] ease-out
                        flex justify-center items-center

                        overflow-clip
                        rounded-full

                        bg-secondary

                        {itemCount > 0
                        ? 'h-[2em] max-w-[2em] min-w-[2em] m-1 px-2'
                        : 'h-0 max-w-0 min-w-0 m-0 px-0'}
                "
        >
                {itemCount}
        </span>
</a>
