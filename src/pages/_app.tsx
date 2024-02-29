"use client";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {appWithTranslation} from 'next-i18next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil'



function App({ Component, pageProps }: AppProps) {

  return (
//  <ThemeProvider attribute='class' enableSystem={true}>

		<RecoilRoot>
			<Head>
				<title>LeetClone</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/leet2.png' />
				
				<meta
					name='description'
					content='Web application that contains leetcode problems and video solutions'
				/>
			</Head>
			<ToastContainer/>
			<div className='font-sans'>
			<Component {...pageProps} /> </div>
		</RecoilRoot>
	
		// </ThemeProvider>
	);

}

export default appWithTranslation(App)
