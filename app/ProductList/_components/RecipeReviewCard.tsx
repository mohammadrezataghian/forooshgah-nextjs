'use client'

import * as React from 'react';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { red } from "@mui/material/colors";
import {Card,CardHeader,IconButton,CardContent,List,ListItemButton,ListItemIcon,ListItemText,Divider} from "@mui/material"
import useGetMenu from "@/app/api/menu/hook";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from 'next/link';
import { MenuDataResponse } from '@/types/types';

const RecipeReviewCard = () => {

  const { loading, error, response,getMenu } = useGetMenu()
// get data
const [menuData, setMenuData] = useState<MenuDataResponse | null>(null);
const [mounted, setMounted] = useState(false);

useEffect(()=>{
  setMounted(true)
},[])

useEffect(() => {
  if (!mounted) return

  if(!!sessionStorage.getItem("MenuData")){
    const data = JSON.parse(sessionStorage.getItem("MenuData") || '');
    setMenuData(data);
  }else{
    const fetchData = async () => {
      try {
        const data = await getMenu();
        setMenuData(data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };

    fetchData();
  }
}, [mounted]);

const firstData = menuData?.Data || [] ;
const Data = firstData.length > 0 ? firstData[0].children : [];
// end get data


    return (
      <Card>
        <CardHeader
          sx={{ background: red[800], padding: 1, paddingInlineStart: 2 }}
          title="دسته بندی"
          titleTypographyProps={{ variant: "subtitle1", color: "white" }}
        />
        <CardContent>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {Data && Data.map((category:any) => {
              return (
                <React.Fragment key={category.Id}>
                  <ListItemButton sx={{ gap: 1 }} >
                    <ListItemIcon sx={{ minWidth: "0" }}>
                      <ChevronLeftIcon />
                    </ListItemIcon>
                    <Link href={`/productList/${category.Name}`}>{category.Name}</Link>
                  </ListItemButton>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>
    );
  };

  export default RecipeReviewCard;