import React, { useEffect, useState } from "react";
import { authModalState } from "@/atoms/authModalAtom";
import { GoogleAuthProvider, signInWithPopup,GithubAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
//handleLogin login password
type LoginProps = {}
const Login:React.FC<LoginProps>=()=>{
    const setAuthModalState = useSetRecoilState(authModalState)
    const router = useRouter()
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider()
	const handleClick = (type:string)=>{
        setAuthModalState((prev)=>({...prev,type:'register'}))
    }
    const handlePwd = (type:string)=>{
        setAuthModalState((prev)=>({...prev,type:'forgotPassword'}))
    }
const  [inputs,setInputs] = useState({email:'',password:''})
const [signInWithEmailAndPassword,user,loading, error,] = useSignInWithEmailAndPassword(auth);
const handleInputs = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputs((prev)=>({...prev,[e.target.name]:e.target.value}))
}
const handleLogin=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!inputs.email||!inputs.password) return toast.error("Please fill all")
    try{
const user = await signInWithEmailAndPassword(inputs.email, inputs.password)
if(!user) return;
toast.success("Login Successful!")
router.push('/')
}catch(err:any){
   toast.error(err.message,{position:"top-center",theme:"dark"})
}
}
const googleSignIn = () =>signInWithPopup(auth, googleProvider);
const gitSignIn = ()=>signInWithPopup(auth,githubProvider)
useEffect(() => {
    if(error) alert(error.message)
  }, [])
return (
<><form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
    <h3 className="text-xl font-medium text-white">Sign in to Leetcode</h3>
    <div>
        <label htmlFor="email" className="text-sm font-medium block m-2 text-gray-300">
            Your Email
        </label>
        <input onChange={handleInputs} type="email" name="email" id="email" className="border-2 outline-none sm:text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray border-gray-500 placeholder-gray-500 text-white" placeholder="name@company.com"/>
    </div>
    <div>
        <label htmlFor="password" className="text-sm font-medium block m-2 text-gray-300">
            Your password
        </label>
        <input onChange={handleInputs} type="password" name="password" id="password" className="border-2 outline-none sm:text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray border-gray-500 placeholder-gray-500 text-white" placeholder="********"/>
    </div>
    <button type="submit" className="w-full text-white focus:ring-blue-500 font-medium
    rounded-lg text-small px-5 py-2.5 text-center bg-brand-orange hover:bg-orange-600">
        {loading?"Loading":"Login"}
    </button>
    <button className="flex w-full justify-end">
        <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right" onClick={()=>handlePwd("forgotPassword")}>
            Forgot Password?
        </a>
    </button>
    <div className="text-sm font-medium text-gray-500">
        New User?
        <a href="#" className="text-blue-700 hover:underline" onClick={()=>handleClick("register")}>Create Account</a>
    </div>
</form>
<div className="w-[90] bg-white m-2 text-dark-layer-2 flex justify-center items-center rounded-lg text-center mt-5">
<FcGoogle size={'27'}/>
<button onClick={googleSignIn} className="px-5 py-2 font-medium">    
Login with Google</button>
				</div>
                <div className="w-[90] bg-white m-2 text-dark-layer-2 flex justify-center items-center rounded-lg text-center mt-5">
<VscGithub size={'27'}/>
<button onClick={gitSignIn} className="px-5 py-2 font-medium">    
Login with Github</button>
				</div>
                </>)
}
export default Login