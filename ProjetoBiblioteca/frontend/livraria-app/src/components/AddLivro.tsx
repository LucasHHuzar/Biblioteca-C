import React, { useState } from 'react';
import { addLivro } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddLivro = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [genero, setGenero] = useState('');
  const [exemplaresDisponiveis, setExemplaresDisponiveis] = useState('');
  const [error, setError] = useState('');
  const [mensagem, setMensagem] = useState('');

  const cadastrarLivro = (e: React.FormEvent<HTMLFormElement>) => {
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
        setMensagem('Livro cadastrado com Sucesso!');
        setTimeout(() => {
          setMensagem('');
        }, 3000); // Limpa a mensagem após 3 segundos
        navigate('/livros/listar');
      })
      .catch((error) => {
        console.error('Erro ao adicionar livro:', error);
        setError('Erro ao adicionar livro. Tente novamente mais tarde.');
        setMensagem('');
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
      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
    </form>
  );
};

export default AddLivro;