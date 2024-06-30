import React, { useEffect, useState } from 'react';
import { addEmprestimo } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  exemplaresDisponiveis: number;
}

interface Emprestimo {
  livroId: string;
  usuarioId: string;
}

const EmprestimoLivros: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [livro, setLivro] = useState<any>(null); // Estado para armazenar os detalhes do livro
  const [usuarioId, setUsuarioId] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5077/api/livros/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((livro) => {
          setLivro(livro); // Atualiza o estado do livro com os detalhes buscados
        })
        .catch((error) => console.error('Erro ao buscar livro:', error));
    }
  }, [id]);

  const emprestimoLivro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!livro) {
      console.error('Nenhum livro carregado.');
      return;
    }

    const novoEmprestimo: Emprestimo = { livroId: livro.id, usuarioId };

    addEmprestimo(novoEmprestimo)
      .then(() => {
        setLivro(null);
        setUsuarioId('');
        setMensagem('Empréstimo realizado com sucesso!');
        setTimeout(() => {
          setLivro(null); // Limpa o estado do livro após emprestar
          navigate('/EmprestimoLivro'); // Navega para o caminho correto
        }, 2000);
      })
      .catch((error) => console.error('Erro ao adicionar empréstimo:', error));
  };

  return (
    <form onSubmit={emprestimoLivro}>
      <h1>Adicionar Empréstimo</h1>
      {livro ? (
        <>
          <p>Detalhes do Livro:</p>
          <p>Título: {livro.titulo}</p>
          <p>Autor: {livro.autor}</p>
          <p>Ano de Publicação: {livro.anoPublicacao}</p>
          <p>Exemplares Disponíveis: {livro.exemplaresDisponiveis}</p>
        </>
      ) : (
        <p>Carregando informações do livro...</p>
      )}
      <label>
        Id Usuario:
        <input type="text" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} />
      </label>
      <button type="submit">Emprestar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default EmprestimoLivros;