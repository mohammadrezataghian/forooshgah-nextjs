import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import CheckIcon from '@mui/icons-material/Check';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
    },
}));

type CustomizedDividersProps = {
    SimilarProducts:any;
    selectedColor:string;
    setSelectedColor:React.Dispatch<React.SetStateAction<string>>;
    setSelectedHexColor:React.Dispatch<React.SetStateAction<string>>;
    setPriceAfterSelection:React.Dispatch<React.SetStateAction<number>>;
    setSelectedItem:React.Dispatch<React.SetStateAction<any>>;
    setMojodiAfterSelection:React.Dispatch<React.SetStateAction<number>>;
}

export default function CustomizedDividers({SimilarProducts,selectedColor,setSelectedColor,setSelectedHexColor,setPriceAfterSelection,setSelectedItem,setMojodiAfterSelection}:CustomizedDividersProps) {

    const handleAlignment = (event:any, newValue:any) => {
        if (newValue !== null) {
          setSelectedColor(newValue);
          const selectedItem = SimilarProducts.find(
            (p:any) => p.ColorName === newValue
          );
          if (selectedItem) {
            setSelectedHexColor(selectedItem.HexaColor);
            setPriceAfterSelection(selectedItem.PriceForoosh)
            setMojodiAfterSelection(selectedItem.FldTedad)
            setSelectedItem(selectedItem)
          }
        }
      };

// check the darkness

// function isColorDark(hex: string): boolean {
function isColorDark(hex:any) {
    if (!hex) return false;
    // remove # if present
    hex = hex.replace(/^#/, '');
  
    // convert short hex (#fff) to long hex (#ffffff)
    if (hex.length === 3) {
      hex = hex.split('').map((x:any) => x + x).join('');
    }
  
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
  
    // Perceived brightness (YIQ formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness < 128; // dark if brightness is low
  }
  // end check the darkness

  return (
    <div>
      <Paper
        elevation={0}
        sx={(theme) => ({
          display: 'flex',
          flexWrap: 'wrap',
        })}
      >
        <StyledToggleButtonGroup
          size="small"
          value={selectedColor}
          exclusive
          onChange={handleAlignment}
        //   aria-label="text alignment"
        >
            {SimilarProducts.filter((item:any) => item.HexaColor && item.ColorName)
              .map((item:any) => (
                <ToggleButton key={item.IdKala} value={item.ColorName}
                //  aria-label="right aligned"
                 >
                    <div className='w-9 h-9 p-1 rounded-full border border-black'>
                        <div className='w-full h-full rounded-full flex justify-center items-center' style={{backgroundColor:item.HexaColor}}>
                            {(selectedColor === item.ColorName) && <CheckIcon style={{ color: isColorDark(item.HexaColor) ? "#fff" : "#000" }}/>}
                        </div>
                    </div>
                </ToggleButton>)
            )}
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}