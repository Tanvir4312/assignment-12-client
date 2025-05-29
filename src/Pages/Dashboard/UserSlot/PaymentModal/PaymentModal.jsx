import React from 'react'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_PK)

const PaymentModal = ({ setIsOpen, isOpen, subscriptionAmount, userInfo, refetch }) => {
    return (
        <div className=''>

            <AnimatePresence>
                {isOpen && (
                    <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30"
                        />
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <DialogPanel
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-lg space-y-4 bg-blue-200 p-12 rounded"
                            >
                                <DialogTitle className="text-lg font-bold">Confirm Subscription</DialogTitle>
                                <Description>Complete your payment to activate your subscription.</Description>
                                <Elements stripe={stripePromise} >
                                    <PaymentForm
                                        setIsOpen={setIsOpen}
                                        subscriptionAmount={subscriptionAmount}
                                        userInfo={userInfo}
                                        refetch={refetch}
                                    ></PaymentForm>
                                </Elements>

                            </DialogPanel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PaymentModal
