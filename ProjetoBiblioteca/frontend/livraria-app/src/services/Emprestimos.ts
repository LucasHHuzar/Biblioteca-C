import { Livros } from "./Livros";
import { Usuarios } from "./Usuarios";

export interface Emprestimos {
    id?: string;
    livroId: string;
    livros: Livros;
    usuarioId: number;
    usuarios: Usuarios;
    dataEmprestimo: number;
  }
  