import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import store from "./store"
import { Provider } from "react-redux"
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider>
        <Layout>
          <App />
        </Layout>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

