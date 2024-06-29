import React, { useState } from 'react';
import { addUsuario } from '../services/api';

const EmprestimoLivros = () => {
    const [livroId, setLivroId] = useState('');
    const [usuarioId, setUsuarioId] = useState('');

  const emprestimos = (e: any) => {
    e.preventDefault();
    const novoEmprestimo = { livroId, usuarioId };
    addUsuario(novoEmprestimo)
      .then(() => {
        setLivroId('');
        setUsuarioId('');
      })
      .catch((error) => console.error('Erro ao adicionar empréstimo:', error));
  };

  return (
    <form onSubmit={emprestimos}>
      <h1>Adicionar Usuário</h1>
      <label>
        Id Livro:
        <input type="text" value={livroId} onChange={e => setLivroId(e.target.value)} />
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
