import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Board from './components/board/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Board />
      <Footer />
    </div>
  );
} 

export default App;
