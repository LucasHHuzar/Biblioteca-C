using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoBiblioteca.Models
{
    public class Devolucao
    {

        public Devolucao(string livroId, string usuarioId)
        {
            LivroId = livroId;
            UsuarioId = usuarioId;
        }

        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public string? LivroId { get; set; }
        public Livros? Livro { get; set; } = null;

        [Required]
        public string? UsuarioId { get; set; }
        public Usuario? Usuario { get; set; } = null;

        public DateTime DataDevolucao { get; set; } = DateTime.Now;
    }
}
