// LivrosListar.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLivros } from '../services/api';
import { Livros } from '../services/Livros';

function LivrosListar() {
  const [livros, setLivros] = useState<Livros[]>([]);

  useEffect(() => {
    carregarLivros();
  }, []);

  function carregarLivros() {
    fetch('http://localhost:5077/api/livros/listar')
      .then((resposta) => resposta.json())
      .then((livros: Livros[]) => {
        console.table(livros);
        setLivros(livros);
      });
  }

  function deletar(id: string) {
    fetch(`http://localhost:5077/api/livros/deletar/${id}`, {
      method: 'DELETE',
  })
    .then((resposta)=> resposta.json())
    .then((dados) => {
      console.log(dados);
      carregarLivros();
    });
  }
  return (
    <div>
      <h1>Lista de Livros</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Id do Livro</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano de Publicação</th>
            <th>Exemplares Disponíveis</th>
            <th>Emprestar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.anoPublicacao}</td>
              <td>{livro.exemplaresDisponiveis}</td>
              <td><Link to={`/emprestimo/cadastrar/${livro.id}`}>Emprestar</Link></td>
              <td><button onClick={() =>{deletar(livro.id!)}}>Deletar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LivrosListar;
