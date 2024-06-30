import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Livros } from '../services/Livros';

function LivrosListar() {
  const [livros, setLivros] = useState<Livros[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarLivros();
  }, []);

  function carregarLivros() {
    setLoading(true);
    fetch('http://localhost:5077/api/livros/listar')
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao buscar livros');
        }
        return resposta.json();
      })
      .then((livros: Livros[]) => {
        setLivros(livros);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro:', error);
        setError('Nenhum livro disponível no momento');
        setLoading(false);
      });
  }

  function deletar(id: string) {
    fetch(`http://localhost:5077/api/livros/deletar/${id}`, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao deletar livro');
        }
        return resposta.json();
      })
      .then((dados) => {
        console.log(dados);
        setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao deletar livro:', error);
        setError('Erro ao deletar livro');
      });
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Lista de Livros</h1>
      {livros.length > 0 && (
        <table border={1}>
          <thead>
            <tr>
              <th>Id do Livro</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Ano de Publicação</th>
              <th>Exemplares Disponíveis</th>
              <th>Emprestar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro.id}>
                <td>{livro.id}</td>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>{livro.anoPublicacao}</td>
                <td>{livro.exemplaresDisponiveis}</td>
                <td><Link to={`/emprestimo/cadastrar/${livro.id}`}>Emprestar</Link></td>
                <td><button onClick={() => deletar(livro.id!)}>Deletar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LivrosListar;