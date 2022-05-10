import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Hero } from './components/hero';

function App() {
  return (
    <ChakraProvider theme={theme}>
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
              path="/home"
              element={<Box textAlign="center" fontSize="xl"></Box>}
            />
          </Routes>
        </BrowserRouter>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
