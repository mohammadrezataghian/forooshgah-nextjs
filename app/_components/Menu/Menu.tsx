'use client'
import React from "react";
import dynamic from "next/dynamic";
const MenuDynamic = dynamic(() => import('./MenuDynamic'), {ssr: false,});

const Menu = () => {
  return (
    <>
      <MenuDynamic/>
    </>
  );
};

export default Menu;