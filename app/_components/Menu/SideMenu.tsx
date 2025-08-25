import React from "react";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AccordionMenu from "./AccordionMenu";

type SidemenuDrawerProps = {
    isOpen: boolean;
    toggleDrawer: (open: boolean) => (event:any) => void;
}

const SidemenuDrawer = ({ isOpen, toggleDrawer }:SidemenuDrawerProps) => {
  

  return (
    <SwipeableDrawer anchor="right" open={isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} className="z-[100000]">
          {/*START ACCORDION  */}
            <div className="w-[320px] h-full overflow-scroll">
              <AccordionMenu toggleDrawer={toggleDrawer}/>
            </div>
          {/*END ACCORDION  */}
    </SwipeableDrawer>
  );
};

export default SidemenuDrawer;