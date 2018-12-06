import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { client } from 'config/apollo';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import ScrollToTop from './ScrollToTop';
import './styles/fontawesome/webfonts/fontawesome-all.css';
import './styles/main.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
