import 'regenerator-runtime/runtime'
import React from 'react';
import { App } from '../src/App';
import './app.css';
import { RecoilRoot } from "recoil"

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>);