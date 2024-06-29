using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoBiblioteca.Models
{
    public class Devolucao
    {
        public Devolucao()
        {
            Id = Guid.NewGuid().ToString();
            DataDevolucao = DateTime.Now;
            LivroId = null;
            UsuarioId = null;
            Livro = null;
            Usuario = null;
        }

        public Devolucao(string livroId, string usuarioId)
        {
            Id = Guid.NewGuid().ToString();
            LivroId = livroId;
            UsuarioId = usuarioId;
            DataDevolucao = DateTime.Now;
            Livro = null;
            Usuario = null;
        }

        public string Id { get; set; }

        [ForeignKey("Livro")]
        public string? LivroId { get; set; }
        public Livros? Livro { get; set; }

        [ForeignKey("Usuario")]
        public string? UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }

        public DateTime DataDevolucao { get; set; }
    }
}
