import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
const KEY = "pk_test_51OoMhBSHX4xukfmPoWJ25CoSS452rpcNGo8ihtFu5J4hYeYofo4xFoce9OpWPynIlLCdBXdmLc7EFvAS6JUyAUgn00HvJ0XIJ1"

export default function Pay() {
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51OoMhBSHX4xukfmPoWJ25CoSS452rpcNGo8ihtFu5J4hYeYofo4xFoce9OpWPynIlLCdBXdmLc7EFvAS6JUyAUgn00HvJ0XIJ1")

        const body = {
            products: cart
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch('http://localhost:3344/api/stripe/create-checkout-session', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.data;
        console.log(session);

        const result = stripe.redirectToCheckout({
            session: session.Id
        })

        if (result.error) {
            console.log(result.error);
        }
    };

   

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",

            }}
        >
            <button onClick={() => { makePayment(), handleSubmitOrder() }}>

                Pay
            </button>
        </div>
    )
}