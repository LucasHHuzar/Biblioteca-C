import React, { useEffect, useState } from 'react';
import { getLivros } from '../services/api';

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
            <th>Id Livro</th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Ano de Publicação</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
              <tr key={livro.livroId}>
              <td>{livro.livroId}</td>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.anoPublicacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LivrosListar;
