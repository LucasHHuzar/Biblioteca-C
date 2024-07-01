import { useEffect, useState } from 'react';
import { Usuarios } from '../services/Usuarios';
import { Link } from 'react-router-dom';

function UsuariosListar() {
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    setLoading(true);
    fetch('http://localhost:5077/api/usuario/listar')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        return resposta.json();
      })
      .then((usuarios: Usuarios[]) => {
        setUsuarios(usuarios);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro:', error);
        setError('Erro ao carregar usuários');
        setLoading(false);
      });
  }

  function deletar(id: string) {
    fetch(`http://localhost:5077/api/usuario/deletar/${id}`, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao deletar usuário');
        }
        return resposta.json();
      })
      .then((dados) => {
        console.log(dados);
        setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao deletar usuário:', error);
        setError('Erro ao deletar usuário');
      });
  }

  function alterar(id: string) {
    fetch(`http://localhost:5077/api/usuario/alterar/${id}`, {
      method: 'PUT',
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao alterar usuário');
        }
        return resposta.json();
      })
      .then((dados) => {
        console.log(dados);
        carregarUsuarios();
      })
      .catch((error) => {
        console.error('Erro ao alterar usuário:', error);
        setError('Erro ao alterar usuário');
      });
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {usuarios.length > 0 ? (
      <table border={1}>
        <thead>
          <tr>
            <th>Id Usuario</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Alterar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
              <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.email}</td>
              <td><Link to={`/usuario/alterar/${usuario.id}`}>Alterar</Link></td>
              <td><button onClick={() =>{deletar(usuario.id!)}}>Deletar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>Nenhum usuário foi criado.</p>
    )}
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
);
}

export default UsuariosListar;