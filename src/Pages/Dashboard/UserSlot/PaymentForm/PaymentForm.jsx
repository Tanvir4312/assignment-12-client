import React, { useEffect, useState } from 'react'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import './formStyle.css';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';



const PaymentForm = ({ setIsOpen, subscriptionAmount, userInfo, refetch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxiosSecure()


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: subscriptionAmount })
            .then(res => {

                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, subscriptionAmount])

    const handleSubmit = async (event) => {

        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log(confirmError)
        }
        else {
            console.log(paymentIntent)
            if (paymentIntent.status === 'succeeded')
                toast.success(`Payment successfully. Transaction ID: ${paymentIntent.id}`)
            setIsOpen(false)


            // Now save the payment in the database
            const paymentInfo = {
                email: user?.email,
                price: subscriptionAmount,
                transactionId: paymentIntent.id,
                subscriptionDate: new Date(),

            }

            try {

                await axiosSecure.post('/payments', paymentInfo)
                // update user collection
                await axiosSecure.patch(`/data-update/${userInfo?._id}`, {
                    isSubscribed: true,
                    subscriptionDate: new Date(),
                    paymentVerified: true,
                    status: "verified",
                })
                refetch()
            } catch (err) {
                console.log(err)
            }
        }
    };
    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
           
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
          

                <div className="flex gap-4">
                    <button disabled={!stripe || !clientSecret} className='btn bg-blue-500 w-2/4 hover:text-white'>Pay</button>
                    <button className='btn w-2/4 bg-amber-600 hover:text-white' onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentForm
