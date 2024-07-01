import { useEffect, useState } from 'react';
import { Usuarios } from '../services/Usuarios';
import { Link } from 'react-router-dom';

function UsuariosListar() {
  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

function carregarUsuarios() {
  fetch('http://localhost:5077/api/usuario/listar')
    .then((resposta) => resposta.json())
    .then((usuarios: Usuarios[]) => {
      console.table(usuarios);
      setUsuarios(usuarios);
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
  return (
    <div>
      <h1>Lista de Usuários</h1>
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
    </div>
  );
};

export default UsuariosListar;

