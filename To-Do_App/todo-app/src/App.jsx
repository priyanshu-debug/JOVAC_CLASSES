import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function addTask(e) {
    e.preventDefault();
    if (inputValue === '') return;

    setTasks([...tasks, inputValue]);
    setInputValue('');
  }

  function deleteTask(indexToDelete) {
    const newTasks = tasks.filter((task, index) => index !== indexToDelete);
    setTasks(newTasks);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>My To-Do List</h2>
      
      <form onSubmit={addTask}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Write a task..."
          style={{ padding: '10px', width: '70%', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Add</button>
      </form>

      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', background: '#f4f4f4', padding: '10px' }}>
            <span>{task}</span>
            <button onClick={() => deleteTask(index)} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;