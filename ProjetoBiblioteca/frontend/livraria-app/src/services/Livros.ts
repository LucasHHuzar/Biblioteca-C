import { Emprestimos } from "./Emprestimos";

export interface Livros {
    id?: string;
    titulo: string;
    autor: string;
    anoPublicacao: number;
    genero: string;
    exemplaresDisponiveis: number;
    criadoEm?: string;
    emprestimo?: Emprestimos;
  }
  