<script lang="ts">
        import countries from '$lib/api/countries.json';
        
        import recipient from '$lib/api/stores/recipient';

</script>

<form>
        <label for="name" class="required">Full Name</label>
        <input type="text" name="name" id="name" placeholder="John Doe" />

        <label for="company">Company</label>
        <input type="text" name="company" id="company" placeholder="Company Name" />

        <label for="email" class="required">Email</label>
        <input type="email" name="email" id="email" placeholder="john.doe@example.com" />

        <label for="phone" class="required">Phone</label>
        <input type="tel" name="phone" id="phone" placeholder="+" />

        <label for="address" class="required">Address</label>
        <input type="text" name="address" id="address" placeholder="1234 Main St" />

        <label for="address2">Address 2</label>
        <input type="text" name="address2" id="address2" placeholder="Apartment, studio, or floor" />

        <label for="city" class="required">City</label>
        <input type="text" name="city" id="city" placeholder="City" />

        <label for="country">Country</label>
        <select name="country" id="country">
                <option value="" disabled selected>Select your country</option>

                {#each countries as country}
                        <option value={country.code}>{country.name}</option>
                {/each}
        </select>

        <label for="state" class="required">State</label>
        <input type="text" name="state" id="state" placeholder="State" />


</form>

<style>
        .required:after {
                content: '*';
                color: red;
        }
</style>