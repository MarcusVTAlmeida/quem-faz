import logo from './logo.svg';
import './App.css';
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import React, { useState } from 'react';

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [completed, setCompleted] = useState('');
const [created, setCreated] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await addDoc(collection(db, 'users'), {
      title: title,
      description: description,
      completed: false,
      created: Timestamp.now()
    })
    onClose()
  } catch (err) {
    alert(err)
  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form onSubmit={handleSubmit} className='addTask' name='addTask'></form>
      </header>
    </div>
  );
}

export default App;
