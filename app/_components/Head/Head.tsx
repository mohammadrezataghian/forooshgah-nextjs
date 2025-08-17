'use client'

import React, { useState } from "react";
import Drawer from "./Drawer";

const Head = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);

  //  start handle drawer
  const toggleDrawer = (newOpen:any) => () => {
    setDrawerOpen(newOpen);
  };
  // end handle drawer
    
  return (
    <>
    



    <Drawer anchor="right" open={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  )
}

export default Head