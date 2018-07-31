import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DemoApp from './appp';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<DemoApp />, document.getElementById('root'));
registerServiceWorker();
