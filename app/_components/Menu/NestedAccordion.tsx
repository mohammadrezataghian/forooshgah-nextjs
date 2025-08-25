import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import NestedNestedAccordion from './NestedNestedAccordion';
import Link from 'next/link';

//start styling nested accordion

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: 'none', // Remove border for nested accordion
  width: '100%', // Fit parent width
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#EFEFEF',
  flexDirection: 'row',
  [`& .MuiAccordionSummary-expandIconWrapper.Mui-expanded`]: {
    transform: 'rotate(90deg)',
  },
  [`& .MuiAccordionSummary-content`]: {
    marginLeft: theme.spacing(1),
    color:'#333'
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor:'#FBFBFB',
  borderTop: 'none',
  padding:"0",
  paddingRight:"10px",
}));

// end styling nested accordion

const NestedAccordion = ({
  item,
  expandedNested = '',
  handleNestedChange = () => {},
  expandedNestedNested = '',
  handleNestedNestedChange = () => {},
  subsubMenuData = [],
  lastMenuData = [],
  handleMouseClickSub = () => {},
  handleMouseClickSubSub = () => {},
  nameLink = '',
  toggleDrawer,
  }) => {
// console.log(nameLink);

  return (

    // start nested accordion
    <>
    <div className='ps-1 py-3 flex'><Link onClick={toggleDrawer(false)} href={`/productList/${nameLink}`}>{nameLink}</Link></div>
    {item?.children.map((item:any) => (
      <div key={item.Id}>
      <Accordion
      expanded={expandedNested === `nested${item.Id}`}
      onChange={handleNestedChange(`nested${item.Id}`)}
      onClick={() => handleMouseClickSub(item.Id)}
    >
      <AccordionSummary aria-controls={`nested${item.Id}d-content`} id={`nested${item.Id}d-header`}>
        <Typography component="span">{item.Name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component="div">
        <div className='ps-1 py-3 flex'><Link onClick={toggleDrawer(false)} href={`/productList/${item.Name}`}>{item.Name}</Link></div>
        <NestedNestedAccordion
          expandedNestedNested={expandedNestedNested}
          handleNestedNestedChange={handleNestedNestedChange}
          //api
          subsubMenuData={subsubMenuData}
          lastMenuData={lastMenuData}
          handleMouseClickSubSub={handleMouseClickSubSub}
        />
        </Typography>
      </AccordionDetails>
    </Accordion>
    </div>
    ))}
    </>

    // end nested accordion
  );
};

export default NestedAccordion;
