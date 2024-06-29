import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LivrosListar from './components/LivrosListar';
import AddLivro from './components/AddLivro';
import UsuariosList from './components/UsuariosListar';
import AddUsuario from './components/AddUsuario';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/components/LivrosListar"}>
                Listar Livros{" "}
              </Link>
            </li>
            <li>
              <Link to={"/components/AddLivro"}>
                Cadastrar Livros{" "}
              </Link>
            </li>
            <li>
              <Link to={"/components/AddLivro"}>
                Listar Usuários{" "}
              </Link>
            </li>
            <li>
              <Link to={"/components/AddUsuario"}>
                Cadastrar Usuários{" "}
              </Link>
            </li>
            
          </ul>
        </nav>

        <Routes>

          <Route path="/" element={<LivrosListar />} />

          <Route path="/components/LivrosListar" element={<LivrosListar />} />

          <Route path="/components/AddLivro" element={<AddLivro />} />

          <Route path="/components/UsuariosListar" element={<UsuariosList />} />

          <Route path="/components/AddUsuario" element={<AddUsuario />} />



          {/* <Route path="/pages/produto/alterar/:id" element={<LivrosListar />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
