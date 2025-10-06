import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage(data);
        setUsername('');
        setPassword('');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 💡 Inline styles
  const styles = {
    page: {
      minHeight: '100vh',
      background: 'url("/todo-bg.jpg") no-repeat center center fixed',
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    box: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      width: '350px',
      textAlign: 'center',
    },
    heading: {
      marginBottom: '20px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '8px',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    button: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(to right, #6c63ff, #5146e3)',
      border: 'none',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background 0.3s ease',
    },
    disabledButton: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    success: {
      color: 'green',
      marginTop: '10px',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    link: {
      color: '#5146e3',
      textDecoration: 'none',
      fontWeight: 'bold',
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          /><br />
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.disabledButton : {}),
            }}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <p style={{ marginTop: '12px' }}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
