import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../services/api';

function UsuariosListar() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    getUsuarios()
      .then((response: any) => setUsuarios(response.data))
      .catch((error: any) => console.error('Erro ao buscar usuários:', error));
  }, []);

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
            <th>Emprestimos</th>
            {/* <th>Deletar</th> */}
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
              <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.email}</td>
              <td>{usuario.emprestimo}</td>
              {/* <td>{usuario.deletar}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosListar;

