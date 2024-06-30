// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivrosListar from './components/LivrosListar';
import AddLivro from './components/AddLivro';
import UsuariosList from './components/UsuariosListar';
import AddUsuario from './components/AddUsuario';
import EmprestimoLivros from './components/EmprestimoLivros';
import { Link } from 'react-router-dom';
import DevolucaoLivro from './components/DevolucaoLivros';

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/livros/listar">Listar Livros</Link>
            </li>
            <li>
              <Link to="/livros/cadastrar">Cadastrar Livros</Link>
            </li>
            <li>
              <Link to="/usuarios/listar">Listar Usuários</Link>
            </li>
            <li>
              <Link to="/usuarios/cadastrar">Cadastrar Usuários</Link>
            </li>
            <li>
              <Link to="/emprestimo-livros">Emprestar Livro</Link>
            </li>
            <li>
              <Link to="/devolucao-livro">Devolver Livro</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LivrosListar />} />
          <Route path="/livros/listar" element={<LivrosListar />} />
          <Route path="/livros/cadastrar" element={<AddLivro />} />
          <Route path="/usuarios/listar" element={<UsuariosList />} />
          <Route path="/usuarios/cadastrar" element={<AddUsuario />} />
          <Route path="/emprestimo-livros/:id" element={<EmprestimoLivros />} />
          <Route path="/devolucao-livro" element={<DevolucaoLivro />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
