import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './MyComponents/Header';
import { Footer } from './MyComponents/Footer';
import { Todos } from './MyComponents/Todos';
import AddTodo from './MyComponents/AddTodo';
import About from './MyComponents/About';
import Login from './MyComponents/Login';
import Register from './MyComponents/Register';
import LogOut from './MyComponents/LogOut';

function App() {
  const backgroundStyle = {
    backgroundImage: "url('/todo.jpeg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  const overlayStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "800px",
    width: "90%",
  };

  const initTodo = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  const [todos, setTodos] = useState(initTodo);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
    };
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const addTodo = (title, desc) => {
    const sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;
    const myTodo = { sno, title, desc };
    setTodos([...todos, myTodo]);
  };

  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e.sno !== todo.sno));
  };

  return (
    <Router>
      <div style={backgroundStyle}>
        <div style={overlayStyle}>
          <Header title="My Todos List" searchBar={false} />

          <Routes>
            {/* Home Page - Protected */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <>
                    <AddTodo addTodo={addTodo} />
                    <Todos todos={todos} onDelete={onDelete} />
                    <LogOut />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Login and Register */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />

            {/* About */}
            <Route path="/about" element={<About />} />

            {/* 404 fallback */}
            <Route path="*" element={<h3>404 - Page Not Found</h3>} />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
