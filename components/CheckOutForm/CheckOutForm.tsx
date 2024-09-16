"use client"
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import AddressForm from '../AddressForm/AddressForm'

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [meassage, setMeassage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!stripe){
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        )

        if(!clientSecret){
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch(paymentIntent?.status){
                case "succeeded":
                    setMeassage("Payment succeeded!")
                    break;
                case "processing":
                    setMeassage("Your payment is processing.")
                    break;
                case "requires_payment_method":
                    setMeassage("Your payment was not successful, please try again")
                    break;
                default:
                    setMeassage("Something went wrong")
                    break;
            }
        })
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/success",
            },
        });

        if(error.type === "card_error" || error.type === "validation_error"){
            setMeassage(error.message || "Something went wrong");
        } else {
            setMeassage("An unexpected error occured.");
        }

        setIsLoading(false);
    }
  return (
    <form
        id="payment-form"
        onSubmit={handleSubmit}
        className='min-h[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8'
    >
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement 
            id="payment-element" 
            options={{
                layout: "tabs",
            }}
        />
        <AddressForm/>
        <button disabled={isLoading || !stripe || !elements} id="submit"
            className='bg-red-500 text-white p-4 rounded-md w-28'
        >
            <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
            </span>

        </button>
            {meassage && <div id="payment-message">{meassage}</div>}
    </form>
  )
}

export default CheckOutForm