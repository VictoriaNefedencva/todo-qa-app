import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const API = "http://localhost:4000";

function logFrontend(action, details = "") {
  console.log(`[Frontend Log] ${action}: ${details}`);
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [todos, setTodos] = useState([]);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [newTodo, setNewTodo] = useState("");
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  function fetchTodos() {
    fetch(API + "/items", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(r => r.json())
      .then(setTodos)
      .catch(() => setTodos([]));
    logFrontend("Fetch Todos");
  }

  function onLogin(e) {
    e.preventDefault();
    logFrontend("Attempt login", JSON.stringify(login));
    fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        logFrontend("Login success");
      })
      .catch(() => { 
        alert("Login failed");
        logFrontend("Login failed");
      });
  }

  function addTodo(e) {
    e.preventDefault();
    logFrontend("Add todo", newTodo);
    fetch(API + "/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ text: newTodo })
    })
      .then(r => r.json())
      .then(todo => {
        setTodos([...todos, todo]);
        setNewTodo("");
        logFrontend("Todo added", todo.text);
      });
  }

  function updateTodo(id, text, done) {
    logFrontend("Update todo", `id=${id}, text=${text}, done=${done}`);
    fetch(API + `/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ text, done })
    })
      .then(r => r.json())
      .then(todo => {
        setTodos(todos.map(t => t.id === id ? todo : t));
        setEdit(null);
        logFrontend("Todo updated", JSON.stringify(todo));
      });
  }

  function deleteTodo(id) {
    logFrontend("Delete todo", `id=${id}`);
    fetch(API + `/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    }).then(() => {
      setTodos(todos.filter(t => t.id !== id));
      logFrontend("Todo deleted", `id=${id}`);
    });
  }

  if (!token)
    return (
      <form onSubmit={onLogin}>
        <h2>Login</h2>
        <input
          placeholder="Username"
          value={login.username}
          onChange={e => setLogin({ ...login, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={login.password}
          onChange={e => setLogin({ ...login, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    );

  return (
    <div>
      <h2>Todos</h2>
      <form onSubmit={addTodo}>
        <input
          placeholder="New todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(t =>
          <li key={t.id}>
            {edit === t.id ? (
              <>
                <input
                  defaultValue={t.text}
                  onBlur={e => updateTodo(t.id, e.target.value, t.done)}
                  autoFocus
                />
                <button onClick={() => setEdit(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: t.done ? "line-through" : "" }}
                  onClick={() => updateTodo(t.id, t.text, !t.done)}
                  data-cy="todo-text"
                >{t.text}</span>
                <button onClick={() => setEdit(t.id)}>Edit</button>
                <button onClick={() => deleteTodo(t.id)}>Delete</button>
              </>
            )}
          </li>
        )}
      </ul>
      <button onClick={() => { setToken(""); localStorage.clear(); logFrontend("Logout"); }}>Logout</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);