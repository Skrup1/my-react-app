import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching message:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to My Project!</h1>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    margin: 0,
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default App;

