// LivrosListar.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLivros } from '../services/api'; // Ajuste o caminho conforme necessário

const LivrosListar: React.FC = () => {
  const [livros, setLivros] = useState<any[]>([]);

  useEffect(() => {
    getLivros()
      .then((response: any) => setLivros(response.data))
      .catch((error: any) => console.error('Erro ao buscar livros:', error));
  }, []);

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
            <th>Ação</th>
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
              <td>
                <Link to={`/emprestimo-livros/${livro.id}`}>
                  Emprestar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LivrosListar;
