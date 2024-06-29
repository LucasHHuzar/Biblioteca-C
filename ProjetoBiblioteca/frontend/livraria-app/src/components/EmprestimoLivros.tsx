
import React, { useEffect, useState } from 'react';
import { addEmprestimo } from '../services/api'; // Supondo que o método correto seja addEmprestimo
import { useNavigate, useParams } from 'react-router-dom';
import { Emprestimos } from '../services/Emprestimos';

function EmprestimoLivros() {
  const navigate = useNavigate();
  const { titulo } = useParams();
  
  const [livroId, setLivroId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  useEffect(() => {
    if (titulo) {
      fetch(`http://localhost:5077/api/livros/buscar/${titulo}`)
        .then((resposta) => resposta.json())
        .then((emprestimo: Emprestimos) => {
          setLivroId(emprestimo.livroId);
          setUsuarioId(emprestimo.usuarioId);
        })
        .catch((error) => console.error('Erro ao buscar livro:', error));
    }
  }, [titulo]);

  const emprestimoLivro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const novoEmprestimo = { livroId, usuarioId };

    addEmprestimo(novoEmprestimo)
      .then(() => {
        setLivroId('');
        setUsuarioId('');
        navigate('/caminho-para-onde-ir-apos-emprestimo'); // Defina o caminho para onde navegar após o empréstimo
      })
      .catch((error: any) => console.error('Erro ao adicionar empréstimo:', error));
  };

  return (
    <form onSubmit={emprestimoLivro}>
      <h1>Adicionar Empréstimo</h1>
      <label>
        Id Livro:
        <input type="text" value={livroId} onChange={e => setLivroId(e.target.value)} />
      </label>
      <label>
        Id Usuario:
        <input type="text" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} />
      </label>
      <button type="submit">Emprestar</button>
    </form>
  );
};

export default EmprestimoLivros;

// import React, { useEffect, useState } from 'react';
// import { addUsuario } from '../services/api';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Livros } from '../services/Livros';
// import { Emprestimos } from '../services/Emprestimos';

// function EmprestimoLivros() {

//   const navigate = useNavigate();
//   const { titulo } = useParams();
  
//   const [livroId, setLivroId] = useState('');
//   const [usuarioId, setUsuarioId] = useState('');

//   useEffect(() => {
//     if (titulo) {
//       fetch(`http://localhost:5077/api/livros/buscar/${titulo}`)
//         .then((resposta) => resposta.json())
//         .then((emprestimo: Emprestimos) => {
//           setLivroId(emprestimo.livroId);
//           setUsuarioId(emprestimo.usuarioId);
//         });
//     }
//   }, []);

//   const emprestimos = (e: any) => {
//     e.preventDefault();
//     const novoEmprestimo = { livroId, usuarioId };
//     addUsuario(novoEmprestimo)
//       .then(() => {
//         setLivroId('');
//         setUsuarioId('');
//       })
//       .catch((error) => console.error('Erro ao adicionar empréstimo:', error));
//   };

//   return (
//     <form onSubmit={emprestimos}>
//       <h1>Adicionar Usuário</h1>
//       <label>
//         Id Livro:
//         <input type="text" value={livroId} onChange={e => setLivroId(e.target.value)} />
//       </label>
//       <label>
//         Id Usuario:
//         <input type="text" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} />
//       </label>
//       <button type="submit">Emprestar</button>
//     </form>
//   );
// };

// export default EmprestimoLivros;
