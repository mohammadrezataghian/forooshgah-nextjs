import * as React from "react";
import CheckboxList from "./CheckboxList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {Accordion,Card,Divider,AccordionSummary,AccordionDetails,Slider,Typography,Box} from "@mui/material";


const Filters = ({ checked, setChecked, priceFilter, setPriceFilter }) => {

    const priceChangeTimeout = React.useRef(null);

     // Format numbers with commas
      const autocomma = (number_input:number) => {
        return new Intl.NumberFormat("en-US").format(number_input);
      };
      // end Format numbers with commas
      
    return (
      <Card className="overflow-visible">
        <Accordion disableGutters>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" color="black" sx={{ mx: 1 }}>
              برند
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <CheckboxList checked={checked} setChecked={setChecked} />
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Accordion disableGutters>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" color="black" sx={{ mx: 1 }}>
              قیمت
            </Typography>
            <Typography component="span" color="gray">
              (ریال)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              getAriaLabel={() => "Price"}
              orientation="horizontal"
              getAriaValueText={(value) => `${value}ریال`}
              min={0}
              max={500000000}
              step={1000000}
              defaultValue={[0, 500000000]}
              valueLabelDisplay="auto"
              color="error"
              onChange={(ev, newValue) => {
                if (priceChangeTimeout.current) {
                  clearTimeout(priceChangeTimeout.current);
                }
                priceChangeTimeout.current = setTimeout(() => {
                  setPriceFilter(newValue);
                }, 2000);
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                direction: "ltr",
              }}
            >
              <Typography noWrap variant="body2">
              {autocomma(priceFilter?.[0] ?? 0)} ریال
              </Typography>
              <Typography noWrap variant="body2">
              {autocomma(priceFilter?.[1] ?? 500000000)} ریال
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Card>
    );
  };

  export default Filters;