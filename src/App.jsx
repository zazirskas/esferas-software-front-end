import React from 'react';
import { ChakraProvider, Box, Grid, extendTheme } from '@chakra-ui/react';
import { theme } from '@chakra-ui/pro-theme'
import '@fontsource/inter/variable.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Hero } from './components/hero';
import { Form } from './components/form';

function App() {

  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.blue },
    },
    theme,
  );

  return (
    <ChakraProvider theme={myTheme}>
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Box textAlign="center" fontSize="xl">
                  <Hero />
                </Box>
              }
            />
            <Route
              path="/new-contact"
              element={
              <Box textAlign="center" fontSize="xl">
                <Form />
              </Box>
              }
            />
          </Routes>
        </BrowserRouter>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
