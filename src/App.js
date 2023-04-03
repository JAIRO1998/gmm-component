import React, {useState} from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import { DescContratante } from './components/DescContratante';

function App() {
  const steps = ['Datos del Contratante', 'Datos del Titular', 'Cuestionario', 'Emision'];
  const stepsDesc = [<DescContratante/>, 'Formulario 2', 'Formulario 3', 'Emision']

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};  
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }} className='f-secction'>
            Formulario Finalizado
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          
          <Typography sx={{ mt: 2, mb: 1 }} className='f-secction'>
            {stepsDesc[activeStep]}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Regresar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} color="primary" variant="outlined">
              {activeStep === steps.length - 1 ? 'Emitir' : 'Continuar'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
    </>
  );
}

export default App;
