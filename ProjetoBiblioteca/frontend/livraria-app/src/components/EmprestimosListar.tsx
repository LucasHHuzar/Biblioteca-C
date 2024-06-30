import React, { useEffect, useState } from 'react';
import { emprestimosListar } from '../services/api';
import { Link } from 'react-router-dom';

const EmprestimosListar: React.FC = () => {
  const [emprestimos, setEmprestimos] = useState<any[]>([]);

  useEffect(() => {
    emprestimosListar()
      .then((response: any) => setEmprestimos(response.data))
      .catch((error: any) => console.error('Erro ao buscar emprestimos:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Emprestimos</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Id do Emprestimo</th>
            <th>Id do Livro</th>
            <th>Id do Usuário</th>
            <th>Data de Emprestimo</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map(emprestimo => (
              <tr key={emprestimo.id}>
              <td>{emprestimo.id}</td>
              <td>{emprestimo.livroId}</td>
              <td>{emprestimo.usuarioId}</td>
              <td>{emprestimo.dataEmprestimo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmprestimosListar;
