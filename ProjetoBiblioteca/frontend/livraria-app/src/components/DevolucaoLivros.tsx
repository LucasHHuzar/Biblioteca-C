import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDevolucao } from '../services/api';

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  exemplaresDisponiveis: number;
}

interface Devolucao {
  livroId: string;
  usuarioId: string;
}

const DevolucaoLivros: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [usuario, setUsuario] = useState<any>(); // Estado para armazenar os detalhes do livro
  const [usuarioId, setUsuarioId] = useState<string>('');
  const [livroId, setLivroId] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5077/api/usuario/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((usuario) => {
          console.log(usuario);
          setUsuario(usuario);
        })
        .catch((error) => console.error('Erro ao buscar usuário:', error));
    }
  }, [id]);

  const devolucaoLivro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario) {
      console.error('Nenhum usuário carregado.');
      return;
    }

    const novaDevolucao: Devolucao = { usuarioId: usuario.id, livroId };

    addDevolucao(novaDevolucao)
      .then(() => {
        setUsuario('');
        setLivroId('');
        setMensagem('Devolução realizado com sucesso!');
        setTimeout(() => {
          setUsuario(null); // Limpa o estado do livro após emprestar
          navigate('/livros/listar');
        }, 2000);
      })
      .catch((error: any) => console.error('Erro ao adicionar devolução:', error));
  };

  return (
    <form onSubmit={devolucaoLivro}>
      <h1>Adicionar Devolução</h1>
      <label>
        Id Usuario:
        <input type="text" value={id} onChange={e => setUsuarioId(e.target.value)} />
      </label>
      {usuario ? (
        <>
          <p>Detalhes do Usuario:</p>
          <p>Nome: {usuario.nome}</p>
          <p>Telefone: {usuario.telefone}</p>
          <p>E-mail: {usuario.email}</p>
        </>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}
      <label>
        Id Livro:
        <input type="text" value={livroId} onChange={e => setLivroId(e.target.value)} />
      </label>
      <button type="submit">Devolver</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default DevolucaoLivros;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { devolverLivro } from '../services/api'; // Importe a função devolverLivro do serviço api

// function DevolucaoLivro() {
//   const navigate = useNavigate();
//   const [livroId, setLivroId] = useState('');
//   const [error, setError] = useState('')

//   const livroDevolucao = () => {
//     devolverLivro(livroId)
//       .then(() => {
//         console.log('Livro devolvido com sucesso.');
//         navigate('/livros/listar');
//       })
//       .catch((error) => {
//         console.error('Erro ao devolver o livro:', error);
//         // Trate o erro conforme necessário
//       });
//   };

//   const handleChange = (event: any) => {
//     setLivroId(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Devolver Livro</h1>
//       <label>
//         Id do Livro:
//         <input type="text" value={livroId} onChange={handleChange} />
//       </label>
//       <button onClick={livroDevolucao}>Devolver</button>
//     </div>
//   );
// }

// export default DevolucaoLivro;
