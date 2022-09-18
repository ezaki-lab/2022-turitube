import 'regenerator-runtime/runtime'
import React from 'react';
import { App } from './App';
import './app.css';
import { RecoilRoot } from "recoil"
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
const node_env = process.env.NODE_ENV;
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>);

// jsじゃないとエラー吐くのでそのままにしておく、本番環境のみ
if (node_env=="production") serviceWorkerRegistration.register();