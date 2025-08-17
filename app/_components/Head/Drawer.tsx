'use client'

import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer';
import Divider from "@mui/material/Divider";
import { Button, Card } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useAtom } from "jotai";
import { productListUpdate } from "@/shared/product.list.atom";
import { drawerSessionUpdate } from "@/shared/drawer.product.atom";
import useAddProduct from "@/common/AddRemoveProduct/AddToCart";
import useRemoveProduct from "@/common/AddRemoveProduct/RemoveFromCart";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DrawerDrawerProps = {
  anchor: SwipeableDrawerProps["anchor"];
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
};

const DrawerDrawer : React.FC<DrawerDrawerProps> = ({ anchor, open, toggleDrawer }) => {

  // handle disappearing delete buttons
  const whatPagee = usePathname()
  // handle disappearing delete buttons
  
  // let navigate = useNavigate()
  const [, setDrawerSessionUpdate] = useAtom(drawerSessionUpdate);
  const [, setProductList] = useAtom(productListUpdate);
  const [forceRender, setForceRender] = useState(false);
  const [products] = useAtom(productListUpdate);

  function deleteItem(data: any) {
    const itemResult = products.filter(
      (fl:any) => fl.IdStoreStock !== data.IdStoreStock
    );
    if (itemResult.length === 0) {
      setProductList([]);
      setForceRender((prev) => !prev);
      setDrawerSessionUpdate([]);
      return;
    }
    setDrawerSessionUpdate(itemResult);
    setProductList(itemResult);
    setForceRender((prev) => !prev);
  }

  // handle comma
  const autocomma = (number_input : number) =>
    new Intl.NumberFormat("en-US").format(number_input);
// end handle comma

// add to cart
const { addProduct } = useAddProduct(setProductList);
// end add to cart

// remove from cart
const { removeProduct } = useRemoveProduct(setProductList);
// end remove from cart

  const list = () => (
    <Box
      sx={{ width: 320 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <h2 className="flex py-2 px-2 justify-between"><span>سبد خرید</span>
      <button onClick={toggleDrawer(false)}><CloseIcon /></button>
      </h2>
      <Divider className="mb-2" />

      <div className="flex flex-col gap-5 p-2">
        {products
          ?.sort((a:any, b:any) => b.IdStoreStock - a.IdStoreStock) // Sort in descending order
          .map((el:any) => {
            const count =
              products &&
              products.find((item:any) => item?.IdStoreStock === el.IdStoreStock)?.count;
            return (
              <Card variant="outlined" key={el.IdStoreStock} className="overflow-y-hidden py-3 pl-2 pr-1 gap-1">
                <div className="flex justify-between">
                  
                <div className="flex flex-col items-start justify-between align-middle gap-x-5">
                  {forceRender ? <></> : <></>}
                  <p>
                    {el?.NameKala}
                  </p>
                  <p>{autocomma(el?.PriceForooshAfterDiscount)} ریال</p>
                  <p>{el?.NameMark}</p>
                  {count && <p className="text-green-400 text-center">{count} {el.NameUnit}</p>}
                </div>
                <div className="flex flex-col justify-between">
                  {count && count > 0 && 
                  <div className="flex gap-3 items-center boxshadowHead p-2">
                    <Button sx={{ minWidth: 0, padding: 0 }} className="px-2" onClick={() => addProduct(el)} disabled={whatPagee === "/itemcart" || whatPagee === "/PreFactor" ? true : false}><GoPlus className="text-2xl text-green-500 cursor-pointer"/></Button>
                    <span className="font-[20px]">{count}</span>
                    <Button sx={{ minWidth: 0, padding: 0 }} className="px-2" onClick={() => removeProduct(el)} disabled={whatPagee === "/PreFactor" }><FiMinus className="text-2xl text-red-500 cursor-pointer"/></Button>
                  </div>}
                  <div className="flex justify-center">
                    <div>
                  {!(whatPagee === "/PreFactor") && <AiFillDelete
                    className="text-red-600 text-xl cursor-pointer"
                    onClick={() => deleteItem(el)}
                  />}
                  </div>
                  </div>
                  </div>
                </div>
              </Card>
            );
          })}
        {/* navigate to itemcart */}
        {products && products.length > 0 && (
          <div className="w-full h-full flex justify-center">
            <Link
              href="/itemcart"
              className="p-2 bg-blue-600 rounded-md text-white"
              onClick={(e) => {
                e.stopPropagation();
                toggleDrawer(false)();
              }}
            >
              رفتن به سبد خرید
            </Link>
          </div>
        )}
        {products && products.length === 0 && (
          <div className="w-full h-auto mt-10 flex justify-center text-red-600">
            <p>سبد خرید شما خالی است !</p>
          </div>
        )}
      </div>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      className="z-[100000]"
    >
      {list()}
    </SwipeableDrawer>
  );
};

export default DrawerDrawer;