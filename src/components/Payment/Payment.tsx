import { auth, firestore } from '@/firebase/firebase';
import { loadStripe } from '@stripe/stripe-js';
import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

const CheckoutPage = () => {
    const [user] = useAuthState(auth)
  const handleClick = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      lineItems: [{ price: 'price_1OeHxKSEBCIPU4OVlTjdFnPN', quantity: 1 }],
      billingAddressCollection:'required',
      mode: 'payment',
      successUrl: 'http://localhost:3000/profile',
      cancelUrl: 'http://localhost:3000/auth',
    });
    if (error) {
      console.log(error)
    }
    else{
      toast.success('Payment suucessfull')
      const userRef = doc(firestore,"users",user!.uid)
      await updateDoc(userRef,{
      premium: true
      })
    }
  };

  return (
    <>
    <h1 className='text-center text-5xl font-semibold pt-10'>LeetCode Premium Features</h1>
    <div className="flex justify-center items-center h-screen">
  <div className="flex justify-between w-full max-w-6xl space-x-6">
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col max-w-xs">
      <div className="mr-6">
        <Image src={'/assets/coffee.png'} alt="side img" width={300} height={200}/>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Energetic Morning Contests</h2>
        <p className="text-gray-600 mb-4">Coffee with Code: The fuel that powers programmers' code and dreams.</p>
        
      </div>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col max-w-xs">
      <div className="mr-6">
        <Image src={'/assets/sideImg.jpg'} alt="side img" width={300} height={200}/>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Leetcode Premium</h2>
        <p className="text-gray-600 mb-4">Unlock all the features of LeetCode Premium to enhance your coding experience.</p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={handleClick}>
          Upgrade Now
        </button>
      </div>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col max-w-xs">
      <div className="mr-6">
        <Image src={'/assets/lock.jpg'} alt="side img" width={300} height={200}/>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Access to solutions</h2>
        <p className="text-gray-600 mb-4">Get access to all the solutions from experts with high standards</p>
        
      </div>
    </div>
  </div>
</div>

</>
  );
};

export default CheckoutPage;
