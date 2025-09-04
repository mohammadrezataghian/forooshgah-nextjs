import React from 'react'
import Head from '../_components/Head/Head'
import Footer from '../_components/Footer/Footer';

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