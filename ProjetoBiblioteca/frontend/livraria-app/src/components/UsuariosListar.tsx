import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../services/api';

const UsuariosList: React.FC = () => {
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
            <th>Emprestimos</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
              <tr key={usuario.usuarioId}>
              <td>{usuario.usuarioId}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.emprestimo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosList;

