import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import content from './content.md';

ReactDOM.hydrate(<App content={content} />, document.getElementById('react'));
