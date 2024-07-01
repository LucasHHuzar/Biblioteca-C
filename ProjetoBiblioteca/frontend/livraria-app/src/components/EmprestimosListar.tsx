import React, { useEffect, useState } from 'react';
import { emprestimosListar } from '../services/api';
import { Link } from 'react-router-dom';
import { Emprestimos } from '../services/Emprestimos';

const EmprestimosListar: React.FC = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimos[]>([]);

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
            <th>Devolução</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map(emprestimo => (
              <tr key={emprestimo.usuarioId}>
              <td>{emprestimo.id}</td>
              <td>{emprestimo.livroId}</td>
              <td>{emprestimo.usuarioId}</td>
              <td>{emprestimo.dataEmprestimo}</td>
              <td><Link to={`/devolucao/cadastrar/${emprestimo.usuarioId}`}>Devolver Livro</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmprestimosListar;
