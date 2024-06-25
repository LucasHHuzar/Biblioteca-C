import React, { useEffect, useState } from 'react';
import { getLivros } from '../services/api';

const LivrosList: React.FC = () => {
  const [livros, setLivros] = useState<any[]>([]);

  useEffect(() => {
    getLivros()
      .then((response: any) => setLivros(response.data))
      .catch((error: any) => console.error('Erro ao buscar livros:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map(livro => (
          <li key={livro.id}>{livro.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export default LivrosList;
