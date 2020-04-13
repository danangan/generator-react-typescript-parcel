import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.scss'

function App() {
  return <h1 className={styles.title}>Hello world!</h1>
}

const container = document.getElementById('root');

ReactDOM.render(<App />, container);
