import React from 'react';
import ReactDOM from 'react-dom';
import './super.css';
import registerServiceWorker from './registerServiceWorker';
import SuperAnnuation from './App/SuperAnnuation/index'

ReactDOM.render(<SuperAnnuation />, document.getElementById('super_calculator'));
registerServiceWorker();
