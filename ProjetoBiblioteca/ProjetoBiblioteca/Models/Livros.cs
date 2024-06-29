using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjetoBiblioteca.Models
{
    public class Livros
    {
        public Livros()
        {
            Emprestimos = new List<Emprestimo>();
        }

        public Livros(string titulo, string autor, int anoPublicacao, string genero, int exemplaresDisponiveis)
        {
            Titulo = titulo;
            Autor = autor;
            AnoPublicacao = anoPublicacao;
            Genero = genero;
            ExemplaresDisponiveis = exemplaresDisponiveis;
            Emprestimos = new List<Emprestimo>();
        }

        public string? Id { get; set; } = Guid.NewGuid().ToString();
        public string? Titulo { get; set; }
        public string? Autor { get; set; }
        public int AnoPublicacao { get; set; }
        public string? Genero { get; set; }
        public int ExemplaresDisponiveis { get; set; }
        public DateTime CriadoEm { get; set; } = DateTime.Now;
        public ICollection<Emprestimo> Emprestimos { get; set; } = [];
    }
}
