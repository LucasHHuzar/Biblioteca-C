import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { devolverLivro } from '../services/api'; // Importe a função devolverLivro do serviço api

function DevolucaoLivro() {
  const navigate = useNavigate();
  const [livroId, setLivroId] = useState('');

  const livroDevolucao = () => {
    devolverLivro(livroId)
      .then(() => {
        console.log('Livro devolvido com sucesso.');
        navigate('/livros/listar');
      })
      .catch((error) => {
        console.error('Erro ao devolver o livro:', error);
        // Trate o erro conforme necessário
      });
  };

  const handleChange = (event: any) => {
    setLivroId(event.target.value);
  };

  return (
    <div>
      <h1>Devolver Livro</h1>
      <label>
        Id do Livro:
        <input type="text" value={livroId} onChange={handleChange} />
      </label>
      <button onClick={livroDevolucao}>Devolver</button>
    </div>
  );
}

export default DevolucaoLivro;
