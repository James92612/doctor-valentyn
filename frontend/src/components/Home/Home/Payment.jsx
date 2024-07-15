// Payment.js (React component)
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { END_POINT } from '../../../config';

const stripePromise = loadStripe('pk_test_51PVwkE06BJgUqospNjrufexZH9ZwVv6Hs2vzKwtjhURgydmyvaSjsmsVqYYiBkDQ9MoqxuTLYmTjOFItyL7LKZmf00K4MX2PcV');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Fetch the client secret from the backend
        fetch(`${END_POINT}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1000 }), // Amount in cents
        })
            .then((response) => response.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            setMessage('error.message');
        } else {
            setMessage(`Payment ${paymentIntent.status}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {message && <div>{message}</div>}
        </form>
    );
};

const App = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default App;
