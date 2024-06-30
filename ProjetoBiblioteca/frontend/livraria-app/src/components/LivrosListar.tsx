import React, { useEffect, useState } from 'react';
import { getLivros } from '../services/api';
import { Link } from 'react-router-dom';

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
            <th>Titulo</th>
            <th>Autor</th>
            <th>Ano de Publicação</th>
            <th>Exemplares Disponíveis</th>
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
                <Link to={`/components/EmprestimoLivros/${livro.id}`}>
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
