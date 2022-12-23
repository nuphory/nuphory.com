import type { Writable } from "svelte/store";

export type Recipient = {
        name: string;
        company: string;
        address1: string;
        address2: string;
        city: string;
        state_code: string;
        state_name: string;
        country_code: string;
        country_name: string;
        zip: number;
        phone: string;
        email: string;
        tax_number: string;
};

export type Country = {
        code: string;
        name: string;
        states?: State[];
}

export type State = {
        code: string;
        name: string;
}

export default Recipient;

function createRecipient() {
        const  { subscribe, set, update }: Writable<Recipient> = writable({
                name: '',
                company: '',
                address1: '',
                address2: '',
                city: '',
                state_code: '',
                state_name: '',
                country_code: '',
                country_name: '',
                zip: 0,
                phone: '',
                email: '',
                tax_number: ''
        });
}