import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import DemoApp from './appp';
import App from './brodcast/app'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
