'use client'

import * as React from 'react';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { red } from "@mui/material/colors";
import {Card,CardHeader,CardContent,List,ListItemButton,ListItemIcon,Divider} from "@mui/material"
import Link from 'next/link';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const RecipeReviewCard = () => {

const menuData = useSelector((state:RootState)=>state.menuData.value)

const firstData = menuData?.Data || [] ;
const Data = firstData.length > 0 ? firstData[0].children : [];

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