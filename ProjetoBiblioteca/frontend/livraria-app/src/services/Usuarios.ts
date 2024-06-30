import { Emprestimos } from "./Emprestimos";

export interface Usuarios {
    id?: string;
    nome: string;
    telefone: string;
    email: string;
    emprestimo: Emprestimos;
}
