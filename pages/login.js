import {useState} from 'react'
import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import Image from 'next/image'
import {login_validate} from '../lib/validate'
import { HiAtSymbol , HiFingerPrint } from "react-icons/hi";
import {signIn } from "next-auth/react"
import {useFormik} from 'formik'
import { useRouter } from 'next/router'
export default function Login() {
    const router = useRouter()
    const [show , setShow] = useState(false)
    const formik = useFormik({
        initialValues:{
            email: "",
            password: "",
        },
        validate: login_validate,
        onSubmit
    })
    async function onSubmit(value){
        const status = await signIn('credentials' , {
            redirect: false,
            email: value.email,
            password: value.password,
            callbackUrl: '/'
        })
        status.ok && router.push(status.url)
    }
    // google handler function
    async function handleGoogleSignIn(){
        signIn('google' , {callbackUrl: process.env.BASE_URL})
    }
    // github handler function
    async function handleGithubSignIn(){
        signIn('github' , {callbackUrl: process.env.BASE_URL})
    }
    return <>
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className="w-3/4 mx-auto flex flex-col gap-4">
                <div className="title">
                    <h1 className="text-gray-800 text-4xl font-bold py-4">Welcome Back!</h1>
                </div>
                {/* form */}
                <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                    <div className="input-group">
                        <input {...formik.getFieldProps('email')} className='input-text' type="email" name='email' placeholder="Email" />
                        <span className='icon flex items-center px-4 bg-slate-50'>
                            <HiAtSymbol size={20} className="text-[#CBD5E1]"/>
                        </span>
                    </div>
                        {formik.errors.email && formik.touched.email ? <span className='text-start -mt-4 ml-1 text-red-500'>{formik.errors.email}</span> : <></>}
                    <div className="input-group">
                        <input {...formik.getFieldProps('password')} className='input-text' type={show ? "text" : "password"} name='password' placeholder="Password" />
                        <span onClick={()=>{setShow(!show)}} className='icon flex items-center px-4 bg-slate-50'>
                            <HiFingerPrint size={20} className="text-[#CBD5E1] cursor-pointer hover:text-[#6366f1]"/>
                        </span>
                    </div>
                        {formik.errors.password && formik.touched.password ? <span className='text-start -mt-4 ml-1 text-red-500'>{formik.errors.password}</span> : <></>}
                    {/* login button */}
                    <div className="input-button">
                        <button className='btn' type="submit">Login</button>
                    </div>
                    {/* Google button */}
                    <div className='input-button'>
                        <button onClick={handleGoogleSignIn} className='w-full border py-3 flex justify-center gap-2 hover:bg-gray-200 rounded-lg bg-slate-50 text-gray-700 ' type='button'>Sign in with google <Image src={'/assets/google.svg'} width="20" height={"20"}/></button>
                    </div>
                    {/* Github button */}
                    <div className='input-button'>
                        <button onClick={handleGithubSignIn} className='w-full border py-3 flex justify-center gap-2 hover:bg-gray-200 rounded-lg bg-slate-50 text-gray-700 ' type='button'>Sign in with github<Image src={'/assets/github.svg'} width="20" height={"20"}/></button>
                    </div>
                </form>
                {/* navigation */}
                <p className='text-center text-gray-400'>
                    Dont have an account? <Link href={'/register'}><a className='text-blue-400'>Signup</a></Link>
                </p>
                </section>
        </Layout>
    </>
}