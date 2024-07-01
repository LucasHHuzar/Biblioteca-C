import React, { useEffect, useState } from 'react';
import { devolucaoListar } from '../services/api';
import { Devolucao } from '../services/Devolucao';

const DevolucaoListar: React.FC = () => {
  const [devolucao, setDevolucao] = useState<Devolucao[]>([]);

  useEffect(() => {
    devolucaoListar()
      .then((response: any) => setDevolucao(response.data))
      .catch((error: any) => console.error('Erro ao buscar devoluções:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Devoluções</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Id da Devolução</th>
            <th>Id do Livro</th>
            <th>Id do Usuário</th>
            <th>Data de Devolução</th>
          </tr>
        </thead>
        <tbody>
          {devolucao.map(devolucao => (
              <tr key={devolucao.usuarioId}>
              <td>{devolucao.id}</td>
              <td>{devolucao.livroId}</td>
              <td>{devolucao.usuarioId}</td>
              <td>{devolucao.dataDevolucao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DevolucaoListar;