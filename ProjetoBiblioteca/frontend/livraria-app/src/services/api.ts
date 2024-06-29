import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5077/API', // ajuste conforme a porta usada pela sua API
});

export const getLivros = () => api.get('./components/LivrosListar');
export const getUsuarios = () => api.get('./components/UsuarioListar');
export const addLivro = (livro: any) => api.post('./components/AddLivro', livro);
export const addUsuario = (usuario: any) => api.post('./components/AddUsuario', usuario);

export default api;
