import React, { useState } from 'react';
import { addLivro } from '../services/api';

const AddLivro = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [genero, setGenero] = useState('');
  const [exemplaresDisponiveis, setExemplaresDisponiveis] = useState('');
  const [error, setError] = useState('');

  const cadastrarLivro = (e : any) => {
    e.preventDefault();
    if (!titulo || !autor || !anoPublicacao || !genero || !exemplaresDisponiveis) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    const novoLivro = { 
      titulo, 
      autor, 
      anoPublicacao: parseInt(anoPublicacao), 
      genero, 
      exemplaresDisponiveis: parseInt(exemplaresDisponiveis) 
    };
    addLivro(novoLivro)
      .then(() => {
        setTitulo('');
        setAutor('');
        setAnoPublicacao('');
        setGenero('');
        setExemplaresDisponiveis('');
        setError('');
      })
      .catch((error) => {
        console.error('Erro ao adicionar livro:', error);
        setError('Erro ao adicionar livro. Tente novamente mais tarde.');
      });
  };

  return (
    <form onSubmit={cadastrarLivro}>
      <h1>Adicionar Livro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <input type="number" value={anoPublicacao} onChange={e => setAnoPublicacao(e.target.value)} />
      </label>
      <label>
        Gênero:
        <input type="text" value={genero} onChange={e => setGenero(e.target.value)} />
      </label>
      <label>
        Exemplares Disponíveis:
        <input type="number" value={exemplaresDisponiveis} onChange={e => setExemplaresDisponiveis(e.target.value)} />
      </label>
      <button type="submit">Adicionar Livro</button>
    </form>
  );
};

export default AddLivro;
