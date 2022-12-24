<script lang="ts">
        import SimpleCartList from '$lib/components/store/cart/checkout/SimpleCartList.svelte';

        import {storedOrder} from '$lib/api/stores/order';

        let order = `ORDER ID: ${$storedOrder.external_id}`;
       
        export let data;

        export let subtotal: number = 0;

</script>

<div id="top" class="relative flex flex-1 flex-col justify-center items-center min-h-screen py-8">
        <section id="page-title" class="pointer-events-none">
                <h1 class="tracking-[0.125em]">confirmed</h1>
        </section>
        <div class="content flex flex-col flex-1 justify-center items-start">
                <p class="w-full text-center">{order}</p>
                <section
                        id="cart-list"
                        class="w-80 relative flex flex-col justify-center items-center lg:order-2"
                >
                        <SimpleCartList
                                subtotal={$storedOrder.retail_costs.subtotal || "0.00"}
                                shipping={$storedOrder.retail_costs.shipping || "0.00"}
                        />
                        <section id="back-to-home" class="mb-0 flex justify-center items-center ">
                                <a
                                        id="checkout-button"
                                        class="w-80 badge py-1 px-4 clr-bg clr-text clr-inverse !rounded-full font-mono"
                                        href="/"><b>back to home</b></a
                                >
                        </section>
                </section>
                <!-- <section id="checkout-form" class="max-w-2xl lg:order-1">
                        <CheckoutForm />
                </section> -->
        </div>
</div>
