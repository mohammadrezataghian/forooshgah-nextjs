import * as React from "react";
import {Stack,IconButton,List,ListItemButton,ListItemIcon,ListItemText,ListItem,Checkbox,InputBase,Box} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import useBrands from "./Brands";

type CheckboxListProps={
checked:number[]; 
    setChecked:React.Dispatch<React.SetStateAction<number[]>>;
}

const CheckboxList = ({ checked , setChecked }:CheckboxListProps) => {

    const [brandFilter, setBrandFilter] = React.useState("");
  
    const handleToggle = (brand:any) => () => {
      const currentIndex = checked.indexOf(brand.id);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(brand.id);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
  
  // get brand names to filter
  const brands = useBrands();
  // end get brand names to filter
  
    return (
      <Stack spacing={1}>
        <Box
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            border: 1,
            borderRadius: 1,
            borderColor: "gray",
          }}
        >
          <InputBase
            sx={{ ms: 1, flex: 1 }}
            placeholder="جستجو در برندها ..."
            inputProps={{
              "aria-label": "Search",
              style: { textAlign: "right", paddingInlineStart: ".8em" },
            }}
            onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
              setBrandFilter(ev.target.value.trim().toLowerCase());
            }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon color="disabled" />
          </IconButton>
        </Box>
        <Box style={{ maxHeight: 200, overflow: "auto", borderRadius: 1 }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {brands && brands
              .filter((brand:any) => brand.title?.toLowerCase().includes(brandFilter))
              .sort(
                (a:any, b:any) =>
                  a.title?.toLowerCase().indexOf(brandFilter) -
                  b.title?.toLowerCase().indexOf(brandFilter)
              )
              .map((brand:any) => {
                const labelId = `checkbox-list-label-${brand.title}`;
                return (
                  <ListItem key={brand.id} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(brand)}
                      dense
                      sx={{ gap: 1, padding: 0 }}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <Checkbox
                          edge="start"
                          checked={checked.includes(brand.id)}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={brand.title}
                        sx={{ display: "flex" }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </Stack>
    );
  };

  export default CheckboxList;