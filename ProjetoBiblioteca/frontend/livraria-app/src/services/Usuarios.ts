import { Emprestimos } from "./Emprestimos";

export interface Usuarios {
    id?: string;
    nome: string;
    telefone: string;
    emprestimo: Emprestimos;
}
  