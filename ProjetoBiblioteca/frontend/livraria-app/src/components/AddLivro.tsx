import React, { useState } from 'react';
import { addLivro } from '../services/api';

const AddLivro: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState(0);
  const [genero, setGenero] = useState('');
  const [exemplaresDisponiveis, setExemplaresDisponiveis] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoLivro = { titulo, autor, anoPublicacao, genero, exemplaresDisponiveis };
    addLivro(novoLivro)
      .then(() => {
        setTitulo('');
        setAutor('');
        setAnoPublicacao(0);
        setGenero('');
        setExemplaresDisponiveis(0);
      })
      .catch((error: Error) => console.error('Erro ao adicionar livro:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Adicionar Livro</h1>
      <label>
        Título:
        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />
      </label>
      <label>
        Autor:
        <input type="text" value={autor} onChange={e => setAutor(e.target.value)} />
      </label>
      <label>
        Ano de Publicação:
        <input type="number" value={anoPublicacao} onChange={e => setAnoPublicacao(parseInt(e.target.value))} />
      </label>
      <label>
        Gênero:
        <input type="text" value={genero} onChange={e => setGenero(e.target.value)} />
      </label>
      <label>
        Exemplares Disponíveis:
        <input type="number" value={exemplaresDisponiveis} onChange={e => setExemplaresDisponiveis(parseInt(e.target.value))} />
      </label>
      <button type="submit">Adicionar Livro</button>
    </form>
  );
};

export default AddLivro;
