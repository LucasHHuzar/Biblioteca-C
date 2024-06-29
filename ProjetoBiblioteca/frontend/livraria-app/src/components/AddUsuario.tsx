import React, { useState } from 'react';
import { addUsuario } from '../services/api';

const AddUsuario = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const cadastrarUsuario = (e: any) => {
    e.preventDefault();
    const novoUsuario = { nome, telefone, email };
    addUsuario(novoUsuario)
      .then(() => {
        setNome('');
        setTelefone('');
        setEmail('');
      })
      .catch((error) => console.error('Erro ao adicionar usuário:', error));
  };

  return (
    <form onSubmit={cadastrarUsuario}>
      <h1>Adicionar Usuário</h1>
      <label>
        Nome:
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
      </label>
      <label>
        Telefone:
        <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
      </label>
      <label>
        E-mail:
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <button type="submit">Adicionar Usuário</button>
    </form>
  );
};

export default AddUsuario;