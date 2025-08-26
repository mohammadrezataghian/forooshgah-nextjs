'use client'

import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

// start handling nested nested accodion styles

const Accordion = styled((props: React.ComponentProps<typeof MuiAccordion>) => (
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

const AccordionSummary = styled(
  (props: React.ComponentProps<typeof MuiAccordionSummary>) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
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
  padding:'0',
  paddingRight:'30px',
  margin:'0'
}));

// end handling nested nested accodion styles

// start nested nested accordion

type NestedNestedAccordionProps = {
  expandedNestedNested: string;
  handleNestedNestedChange: (panel:any) => (event:any, newExpanded:any) =>void;
  // subsubMenuData : [];
  // lastMenuData : [];
  // handleMouseClickSubSub : (item:any) => void;
}

const NestedNestedAccordion = ({ expandedNestedNested,
  handleNestedNestedChange,
  // subsubMenuData,
  // lastMenuData,
  // handleMouseClickSubSub,
  }:NestedNestedAccordionProps) => {
  return (
    <>
    {/* {subsubMenuData && subsubMenuData.map((item:any) => (
    <Accordion
      expanded={expandedNestedNested === `nestedNested${item.Id}`}
      onChange={handleNestedNestedChange(`nestedNested${item.Id}`)}
      // onClick={() => handleMouseClickSubSub(item.Id)}
    >
      <AccordionSummary aria-controls={`nestedNested${item.Id}d-content`} id={`nestedNested${item.Id}d-header`}>
        <Typography component="span">{item.Name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {lastMenuData && lastMenuData.map((item:any) => (
        <Typography key={item.Id}>
          <div className='text-right py-2'>
          <a  href="#">
          {item.Name}
          </a>
          </div>
        </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
    ))} */}
    </>
  );
};

// end nested nested accordion

export default NestedNestedAccordion;
