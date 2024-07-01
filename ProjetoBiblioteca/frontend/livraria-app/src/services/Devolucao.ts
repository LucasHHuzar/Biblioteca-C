import { Livros } from "./Livros";
import { Usuarios } from "./Usuarios";

export interface Devolucao {
    id?: string;
    livroId: string;
    livros: Livros;
    usuarioId: string;
    usuarios: Usuarios;
    dataDevolucao: number;
  }
  