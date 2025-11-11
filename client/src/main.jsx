import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme/muiTheme';
import RootRouter from './routes/RootRouter';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <RootRouter />
    </SnackbarProvider>
  </ThemeProvider>
  </React.StrictMode>
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import RootRouter from './routes/RootRouter';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RootRouter />
//   </React.StrictMode>
// );