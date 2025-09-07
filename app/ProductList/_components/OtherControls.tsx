import * as React from "react";
import {Typography,Button,FormControl,
    Select,
    MenuItem,
    Drawer,
    Stack,
    Box} from "@mui/material"
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RecipeReviewCard from "./RecipeReviewCard";
import Filters from "./Filters";

type OtherControlsProps = {
    sort:number;
    setSort:React.Dispatch<React.SetStateAction<number>>;
    priceFilter:number[];
    setPriceFilter:React.Dispatch<React.SetStateAction<number[]>>;
    checked:number[];
    setChecked:React.Dispatch<React.SetStateAction<number[]>>;
}

const OtherControls = ({sort,setSort,priceFilter,setPriceFilter,checked,setChecked}:OtherControlsProps) => {

    const [drawerState, setDrawerState] = React.useState(false);

    const toggleDrawer = (open:any) => (event:any) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerState(open);
    };

    const handleChangeSort = (event:any) => {
      setSort(event.target.value);
    };

    return (
      <Stack
        direction="row"
        bgcolor="#DDD"
        padding={1}
        paddingInline={2}
        borderRadius={1}
        justifyContent="space-between"
      >
        <Button
          variant="text"
          startIcon={<FilterAltIcon />}
          role="presentation"
          onClick={toggleDrawer(true)}
          sx={{
            color: "#000 !important",
            backgroundColor: "#F8F8F8",
            display: { md: "none" },
          }}
        >
          فیلتر کردن
        </Button>
        <Drawer
          anchor={"left"}
          open={drawerState}
          onClose={toggleDrawer(false)}
          sx={{ zIndex: "99999" }}
        >
          <Box>
            <Stack spacing={2} sx={{}}>
              <RecipeReviewCard />
              <Filters 
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                checked={checked}
                setChecked={setChecked}
                />
            </Stack>
          </Box>
        </Drawer>
        <Stack
          spacing={1}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
        >
          <Typography variant="overline" gutterBottom>
            مرتب سازی بر اساس :
          </Typography>
          <FormControl sx={{ m: 0, minWidth: 120 }}>
            <Select
              value={sort}
              onChange={handleChangeSort}
              inputProps={{
                "aria-label": "Without label",
                style: { padding: "0 !important" },
              }}
              sx={{
                backgroundColor: "#F8F8F8",
                "& .MuiSelect-select": {
                  paddingRight: 4,
                  paddingLeft: 2,
                  paddingTop: 1,
                  paddingBottom: 1,
                },
              }}
            >
              {[
                "نام محصول",
                "جدیدترین",
                "قدیمی ترین",
                "بیشترین قیمت",
                "کمترین قیمت",
              ].map((value, index) => (
                <MenuItem key={index} value={index}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl
            sx={{ m: 0, minWidth: 120, display: { xs: "none", md: "flex" } }}
          >
            <Select
              value={order}
              onChange={handleChangeOrder}
              inputProps={{
                "aria-label": "Without label",
                style: { padding: "0 !important" },
              }}
              sx={{
                backgroundColor: "#F8F8F8",
                "& .MuiSelect-select": {
                  paddingRight: 4,
                  paddingLeft: 2,
                  paddingTop: 1,
                  paddingBottom: 1,
                },
              }}
            >
              {["نزولی", "صعودی"].map((value, index) => (
                <MenuItem value={index}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Stack>
      </Stack>
    );
  };

  export default OtherControls;