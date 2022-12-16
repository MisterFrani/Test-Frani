// =========================================================
// * SSO Login
// =========================================================

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

// core styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import './assets/Fonts/CenturyGothic-Light.ttf'
import './assets/Fonts/CenturyGothic-Bold.ttf'

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";

import Main from "./pages/Main";

ReactDOM.render(
  <HashRouter>
    <Main />
  </HashRouter>,
  document.getElementById("root")
);
