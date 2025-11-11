import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#5E81F4' },
    secondary: { main: '#00C4B3' },
    background: { default: '#F7FAFC' }
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto'
  },
  shape: { borderRadius: 10 }
});