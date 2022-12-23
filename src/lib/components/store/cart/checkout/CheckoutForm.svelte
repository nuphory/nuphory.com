<script lang="ts">
        import countries from '$lib/api/countries.json';

        

</script>

<form>
        <label for="country">Country</label>
        <select bind:value={} name="country" id="country">
                <option value="" disabled selected>Select your country</option>

                {#each countries as country}
                        <option value={country.code}>{country.name}</option>
                {/each}
        </select>
</form>
