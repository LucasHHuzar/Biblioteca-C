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
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>{usuario.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsuariosList;

