import { Livros } from "./Livros";
import { Usuarios } from "./Usuarios";

export interface Emprestimos {
    id?: string;
    livroId: string;
    livros: Livros;
    usuarioId: string;
    usuarios: Usuarios;
    dataEmprestimo: number;
  }
  