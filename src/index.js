import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navbar from './Navbar';
import Footer from './Footer'
import './index.css';

ReactDOM.render(
  <Navbar />,
  document.getElementById('navbar')
);
ReactDOM.render(
  <App />,
  document.getElementById('content')
);
ReactDOM.render(
  <Footer />,
  document.getElementById('footer')
);