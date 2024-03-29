type Recipient = {
        name: string;
        company: string;
        address1: string;
        address2: string;
        city: string;
        state_code: string;
        state_name: string;
        country_code: string;
        country_name: string;
        zip: string;
        phone: string;
        email: string;
        tax_number: string;
};

type Country = {
        code: string;
        name: string;
        shipping_available: boolean;
        states?: State[];
};

type State = {
        code: string;
        name: string;
};

export type { Recipient, Country, State };
