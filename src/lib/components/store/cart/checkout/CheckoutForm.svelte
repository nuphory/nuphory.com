<script lang="ts">
        import { browser } from '$app/environment';
        import { onMount } from 'svelte';
        import rawCountries from '$lib/api/countries.json';

        let countries = rawCountries as unknown as Country[];

        let states = countries.find((country) => {
                return country.code === $recipient.country_code;
        })?.states;

        import recipient, { type Country } from '$lib/api/stores/recipient';

        if (browser) {
                recipient.subscribe((value) => {
                        states = countries.find((country) => {
                                return country.code === $recipient.country_code;
                        })?.states;

                        if (
                                value.country_code === 'US' ||
                                value.country_code === 'CA' ||
                                value.country_code === 'AU'
                        ) {
                                document.querySelector('#for-state')?.classList.remove('hidden');
                        } else {
                                value.state_code = '';
                                document.querySelector('#for-state')?.classList.add('hidden');
                        }
                });

                onMount(() => {
                        $recipient.country_code = $recipient.country_code || 'US';
                });
        }
</script>

<form
        class="relative grid m-4 p-4 rounded-[2em] border-[3px] grid-cols-1 xl:grid-cols-2 gap-2 max-w-[20em] lg:max-w-full"
>
        <h4 class="text-2xl font-bold xl:col-start-1">Shipping</h4>
        <section
                id="shipping"
                class="grid grid-cols-1 xl:grid-cols-2 xl:col-start-1 justify-items-stretch place-content-start gap-2"
        >
                <div id="for-name" class="xl:col-span-2">
                        <h6><label for="name" class="required">Full Name</label></h6>
                        <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="John Doe"
                                bind:value={$recipient.name}
                        /><br />
                </div>

                <div id="for-company">
                        <h6><label for="company">Company</label></h6>
                        <input
                                type="text"
                                name="company"
                                id="company"
                                placeholder="Company Name"
                                bind:value={$recipient.company}
                        /><br />
                </div>
                <div id="for-taxid">
                        <h6><label for="taxid">Tax ID</label></h6>
                        <input
                                type="text"
                                name="taxid"
                                id="taxid"
                                placeholder="Tax ID"
                                bind:value={$recipient.tax_number}
                        /><br />
                </div>

                <div id="for-address">
                        <h6><label for="address" class="required">Address</label></h6>
                        <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="1234 Main St"
                                bind:value={$recipient.address1}
                        /><br />
                </div>
                <div id="for-address2">
                        <h6><label for="address2">Address 2</label></h6>
                        <input
                                type="text"
                                name="address2"
                                id="address2"
                                placeholder="Apartment, studio, or floor"
                                bind:value={$recipient.address2}
                        /><br />
                </div>
                <div id="for-city">
                        <h6><label for="city" class="required">City</label></h6>
                        <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                                bind:value={$recipient.city}
                        /><br />
                </div>

                <div id="for-zip">
                        <h6><label for="zip" class="required">Zip</label></h6>
                        <input
                                type="text"
                                name="zip"
                                id="zip"
                                placeholder="Zip"
                                bind:value={$recipient.zip}
                        /><br />
                </div>

                <div id="for-country" class="xl:col-span-2">
                        <h6><label for="country" class="required">Country</label></h6>
                        <select name="country" id="country" bind:value={$recipient.country_code}>
                                {#if $recipient.country_code}
                                        <option value="" disabled>Select your country</option>
                                {:else}
                                        <option value="" disabled selected
                                                >Select your country</option
                                        >
                                {/if}

                                {#each countries as country}
                                        {#if country.code === $recipient.country_code}
                                                <option value={country.code} selected
                                                        >{country.name}</option
                                                >
                                        {:else}
                                                <option value={country.code}>{country.name}</option>
                                        {/if}
                                {/each}
                        </select><br />
                </div>

                <div id="for-state" class="xl:col-span-2 hidden">
                        <h6><label for="state" class="required">State</label></h6>
                        <select name="state" id="state">
                                {#if $recipient.state_code}
                                        <option value="" disabled>Select your state</option>
                                {:else}
                                        <option value="" disabled selected>Select your state</option
                                        >
                                {/if}

                                {#if states}
                                        {#each states as state}
                                                {#if state.code === $recipient.state_code}
                                                        <option value={state.code} selected
                                                                >{state.name}</option
                                                        >
                                                {:else}
                                                        <option value={state.code}
                                                                >{state.name}</option
                                                        >
                                                {/if}
                                        {/each}
                                {/if}
                        </select><br />
                </div>
        </section>
        <h4 class="text-2xl font-bold xl:row-start-1 xl:col-start-2">Contact</h4>
        <section
                id="contact"
                class="flex flex-col w-full xl:col-start-2 -stretch place-content-start gap-2"
        >
                <div id="for-email" class="col-span-1 w-full">
                        <h6><label for="email" class="required">Email</label></h6>
                        <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="john.doe@example.com"
                                bind:value={$recipient.email}
                        /><br />
                </div>
                <div id="for-phone">
                        <h6><label for="phone" class="required">Phone</label></h6>
                        <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="+12345678901"
                                bind:value={$recipient.phone}
                        /><br />
                </div>
        </section>
</form>

<style>
        @tailwind utilities;
        .required:after {
                content: '*';
                color: red;
        }

        form section {
                @apply mt-0;
        }

        form section:last-child {
                @apply m-0;
        }

        section div {
                @apply max-w-full w-full;
        }

        input,
        select {
                @apply w-full;
                @apply rounded-[0.5em] border-[1px];
                @apply border-[var(--color-border)];
        }

        h6 {
                @apply mb-1;
        }
</style>
