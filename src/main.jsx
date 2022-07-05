import React, { StrictMode } from 'react';
import reactDOM from 'react-dom/client'

const $root = document.querySelector('#root')
import { App } from './App';


reactDOM
  .createRoot($root)
  .render(
    <StrictMode>
      <App />
    </StrictMode>
  )