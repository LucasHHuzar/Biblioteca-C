import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LivrosList from './components/LivrosList';
import AddLivro from './components/AddLivro';
import UsuariosList from './components/UsuariosList';
import AddUsuario from './components/AddUsuario';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/livros/listar" element={<LivrosList />} />
        <Route path="/livros/adicionar" element={<AddLivro />} />
        <Route path="/usuarios/listar" element={<UsuariosList />} />
        <Route path="/usuarios/adicionar" element={<AddUsuario />} />
      </Routes>
    </Router>
  );
};

export default App;
