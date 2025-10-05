import React from 'react'
import Head from '@/app/_components/Head/Head'
import Menu from '@/app/_components/Menu/Menu';
import MobileMenu from '@/app/_components/Menu/MobileMenu';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <>
        <div className="w-full sticky top-0 z-[1000] rastchin">
            <Head/>
            <Menu/>
        </div>
        <MobileMenu />
            <main className='bg-[#F4F4F4] pb-24 min-h-screen'>{children}</main>
    </>
  )
}

export default layout