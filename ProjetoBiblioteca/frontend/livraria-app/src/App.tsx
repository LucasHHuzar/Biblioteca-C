// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivrosListar from './components/LivrosListar';
import AddLivro from './components/AddLivro';
import UsuariosList from './components/UsuariosListar';
import AddUsuario from './components/AddUsuario';
import EmprestimoLivros from './components/EmprestimoLivros';
import { Link } from 'react-router-dom';
import EmprestimosListar from './components/EmprestimosListar';
import UsuariosListar from './components/UsuariosListar';
import UsuarioAlterar from './components/UsuariosAlterar';
import DevolucaoLivros from './components/DevolucaoLivros';

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
              <Link to="/livros/listar">Lista de Livros</Link>
            </li>
            <li>
              <Link to="/livros/cadastrar">Cadastrar Livros</Link>
            </li>
            <li>
              <Link to="/usuarios/listar">Lista de Usuários</Link>
            </li>
            <li>
              <Link to="/usuarios/cadastrar">Cadastrar Usuários</Link>
            </li>
            <li>
              <Link to="/emprestimo/listar">Lista de Empréstimos</Link>
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

          <Route path="/usuarios/listar" element={<UsuariosListar />} />

          <Route path="/usuarios/cadastrar" element={<AddUsuario />} />

          <Route path="/emprestimo/listar" element={<EmprestimosListar />} />

          <Route path="/emprestimo/cadastrar/:id" element={<EmprestimoLivros />} /> 

          <Route path="/devolucao/cadastrar" element={<DevolucaoLivros />} /> 

          <Route path="/usuario/alterar/:id" element={<UsuarioAlterar />} /> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
