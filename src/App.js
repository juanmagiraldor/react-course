import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import UserProvider from "./context";
import Login from "./components/Login";

import { GlobalStyle } from "./GlobalStyle";

const App = () => (
  <Router>
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/:movieId" element={<Movie />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <GlobalStyle />
    </UserProvider>
  </Router>
);

export default App;
