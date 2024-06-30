import React, { useEffect, useState } from 'react';
import { getDevolucoes } from '../services/api';

function ListarDevolucoes() {
  const [devolucoes, setDevolucoes] = useState<any[]>([]);

  useEffect(() => {
    getDevolucoes()
      .then((response) => {
        setDevolucoes(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar devoluções:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Devoluções</h1>
      <table>
        <thead>
          <tr>
            <th>Id do Livro</th>
            <th>Id do Usuário</th>
            <th>Data da Devolução</th>
          </tr>
        </thead>
        <tbody>
          {devolucoes.map((devolucao) => (
            <tr key={devolucao.id}>
              <td>{devolucao.livroId}</td>
              <td>{devolucao.usuarioId}</td>
              <td>{devolucao.dataDevolucao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarDevolucoes;
