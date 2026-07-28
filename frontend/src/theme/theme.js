import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2962ff', // TradingView Blue
      light: '#5383ff',
      dark: '#0039cb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#5d99c6',
      contrastText: '#000000',
    },
    background: {
      default: '#0c101b', // Deep Bloomberg-style slate black
      paper: '#161c2e',   // Slightly lighter midnight paper
    },
    text: {
      primary: '#f0f3fa',
      secondary: '#b2b5be',
      disabled: '#60626b',
    },
    success: {
      main: '#089981', // TradingView Green
      light: '#26a69a',
      dark: '#00695c',
    },
    error: {
      main: '#f23645', // TradingView Red
      light: '#ff6f61',
      dark: '#b2001e',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    divider: '#2a2e39',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#f0f3fa',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      color: '#f0f3fa',
      letterSpacing: '-0.015em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#f0f3fa',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#f0f3fa',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#f0f3fa',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#f0f3fa',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.5,
      color: '#d1d4dc',
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.4,
      color: '#b2b5be',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0c101b',
          scrollbarColor: '#2a2e39 #0c101b',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0c101b',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#2a2e39',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#3a3e49',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '6px 16px',
        },
        containedPrimary: {
          backgroundColor: '#2962ff',
          '&:hover': {
            backgroundColor: '#1e4bd8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#161c2e',
          backgroundImage: 'none',
          borderRadius: 8,
          border: '1px solid #2a2e39',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#3a3f50',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #2a2e39',
          padding: '12px 16px',
        },
        head: {
          color: '#b2b5be',
          fontWeight: 600,
          backgroundColor: '#111524',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(41, 98, 255, 0.04)',
          },
        },
      },
    },
  },
});

export default theme;
