import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import { UserContextProvider } from "./components/UserContext.jsx";
import EditPost from './pages/EditPost.jsx';
import CreatePost from './pages/CreatePost.jsx'
import PostPage from './components/PostPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="post/:id" element={<PostPage />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>

  </StrictMode>
);
