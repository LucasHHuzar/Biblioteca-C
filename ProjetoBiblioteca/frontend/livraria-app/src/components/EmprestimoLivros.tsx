
import React, { useEffect, useState } from 'react';
import { addEmprestimo } from '../services/api'; // Supondo que o método correto seja addEmprestimo
import { useNavigate, useParams } from 'react-router-dom';
import { Emprestimos } from '../services/Emprestimos';

interface Emprestimo {
  livroId: string;
  usuarioId: string;
}

function EmprestimoLivros() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [livroId, setLivroId] = useState(id || '');
  const [usuarioId, setUsuarioId] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5077/api/livros/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((emprestimo: Emprestimo) => {
          setLivroId(emprestimo.livroId);
          setUsuarioId(emprestimo.usuarioId);
        })
        .catch((error) => console.error('Erro ao buscar livro:', error));
    }
  }, [id]);

  const emprestimoLivro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const novoEmprestimo: any = { livroId, usuarioId };

    addEmprestimo(novoEmprestimo)
      .then(() => {
        setLivroId('');
        setUsuarioId('');
        navigate('/components/EmprestimoLivro'); // Ajuste o caminho para onde você deseja navegar
      })
      .catch((error) => console.error('Erro ao adicionar empréstimo:', error));
  };

  return (
    <form onSubmit={emprestimoLivro}>
      <h1>Adicionar Empréstimo</h1>
      <label>
        Id Livro:
        <input type="text" value={livroId} readOnly />
      </label>
      <label>
        Id Usuario:
        <input type="text" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} />
      </label>
      <button type="submit">Emprestar</button>
    </form>
  );
};

export default EmprestimoLivros;