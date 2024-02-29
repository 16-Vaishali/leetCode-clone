import Payment from "@/components/Payment/Payment"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

type Props = {}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

const index = (props: Props) => {
  return (
   <Elements stripe={stripePromise}>
    <Payment/>
   </Elements>
  )
}

export default index