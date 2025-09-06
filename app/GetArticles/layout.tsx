import React from 'react'
import Head from '@/app/_components/Head/Head'
import Footer from '@/app/_components/Footer/Footer';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <>
        <Head/>
            <main>{children}</main>
        <Footer/>
    </>
  )
}

export default layout