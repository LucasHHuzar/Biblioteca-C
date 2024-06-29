import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:5077/api', // ajuste conforme a porta usada pela sua API
});

export const getLivros = () => api.get('/livros/listar');
export const getUsuarios = () => api.get('/usuario/listar');
export const addLivro = (livro: any) => api.post('/livros/cadastrar', livro);
export const addUsuario = (usuario: any) => api.post('/usuario/cadastrar', usuario);

export default api;
