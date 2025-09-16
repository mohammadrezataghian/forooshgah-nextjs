'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import useSupplierConfirmation from '@/api/manageOrders/taeedTaminKonande';
import SimpleSnackbar from './StepperAlert';

export default function HorizontalLinearStepper({steps,idSupplier,factorId,url,init,handleSearch}) {
    
  const [activeStep, setActiveStep] = React.useState(init ? 1 : 0);
  const [skipped, setSkipped] = React.useState(new Set());
  const userToken = localStorage.getItem("supplierUserToken"); // token
  const [open, setOpen] = React.useState(false);

  const params = {
      "idTaminKonande":idSupplier,
      "idFactor":factorId	
  }
  const { confirmationLoading, confirmationError, confirmationResponse, getConfirmation } = useSupplierConfirmation(userToken,url)
  
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    getConfirmation(params)
  };
console.log(confirmationResponse);

React.useEffect(()=>{
if (confirmationResponse && confirmationResponse?.data?.Data === true && confirmationResponse?.data?.resCode === 1) {
  setOpen(true)
  handleSearch()
}
},[confirmationResponse])

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep < steps.length - 1 && 
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'center' }}>
            <Box/>
            <Button onClick={handleNext} variant="contained" color="primary" className='p-0 text-white '>
               تایید
            </Button>
          </Box>
        </React.Fragment>
      }
      <SimpleSnackbar open={open} setOpen={setOpen}/>
    </Box>
  );
}