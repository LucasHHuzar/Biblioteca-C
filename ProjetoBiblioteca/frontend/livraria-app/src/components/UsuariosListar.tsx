import { useEffect, useState } from 'react';
import { Usuarios } from '../services/Usuarios';

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
    .then((resposta)=> resposta.json())
    .then((dados) => {
      console.log(dados);
      carregarUsuarios();
    });
}
function alterar(id: string) {
  fetch(`http://localhost:5077/api/usuario/alterar/${id}`, {
    method: 'PUT',
  })
    .then((resposta)=> resposta.json())
    .then((dados) => {
      console.log(dados);
      carregarUsuarios();
    });
}
  return (
    <div>
      <h1>Lista de Usuários</h1>
      {usuarios.length > 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>Id do Usuário</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Alterar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.email}</td>
              <td><button onClick={() =>{alterar(usuario.id!)}}>Alterar</button></td>
              <td><button onClick={() =>{deletar(usuario.id!)}}>Deletar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosListar;