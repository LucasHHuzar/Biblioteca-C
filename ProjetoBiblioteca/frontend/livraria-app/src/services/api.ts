import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5077/api', // ajuste conforme a porta usada pela sua API
});

export const getLivros = () => api.get('/livros/listar');
export const getUsuarios = () => api.get('/usuario/listar');

export const addLivro = (livro: any) => api.post('/livros/cadastrar', livro);
export const addUsuario = (usuario: any) => api.post('/usuario/cadastrar', usuario);

export const addEmprestimo = (emprestimo: any) => api.post('/emprestimo/cadastrar', emprestimo);
export const addDevolucao = (devolucao: any) => api.post('/devolucao/cadastrar', devolucao);

export const emprestimosListar = () => api.get('/emprestimo/listar');
export const devolucaoListar = () => api.get('/devolucao/listar');

export const devolverLivro = (livroId: string) => api.put(`/emprestimo/devolver/${livroId}`);
export const getDevolucoes = () => api.get('/devolucao/listar');

export default api;