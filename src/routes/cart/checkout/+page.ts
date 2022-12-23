import { PUBLIC_PAYPAL_CLIENT_ID } from '$env/static/public';
import { loadScript } from '@paypal/paypal-js';

loadScript({ 'client-id': PUBLIC_PAYPAL_CLIENT_ID })
        .then((paypal) => {
                console.log('loaded the PayPal JS SDK script', paypal);
                if (!paypal) return;
                paypal.Buttons({
                        style: {
                                layout: 'vertical',
                                tagline: false,
                                color: 'blue',

                                shape: 'pill',

                                label: 'paypal'
                        },
                        createOrder: (data, actions) => {
                                return actions.order.create({
                                        intent: 'CAPTURE',
                                        purchase_units: [
                                                {
                                                        amount: {
                                                                value: '0.01'
                                                        }
                                                }
                                        ]
                                });
                        }
                }).render('#paypal-button-container');
        })
        .catch((error) => {
                console.error('failed to load the PayPal JS SDK script', error);
        });

