"use client"

import CheckOutForm from '@/components/CheckOutForm/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'

const  stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const PaymentPage = ({params}: {params: {id: string}}) => {
  const [clientSecret, setClientSecret] = useState(""); 
  const {id} = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${id}`, 
          {
          method: "POST",
         }
      );

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error); 
      }
    }

    makeRequest();
  }, [id]);

  const option:StripeElementsOptions ={
    clientSecret,
    appearance:{
      theme:"stripe"
    }
  }

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={option}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  )
}

export default PaymentPage