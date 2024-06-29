using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoBiblioteca.Models
{
    public class Emprestimo
    {
        public Emprestimo()
        {
            DataEmprestimo = DateTime.Now;
        }

        public Emprestimo(string livroId, string usuarioId)
        {
            LivroId = livroId;
            UsuarioId = usuarioId;
            DataEmprestimo = DateTime.Now;
        }

        public string? Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [ForeignKey("Livro")]
        public string? LivroId { get; set; }
        public Livros? Livro { get; set; }
        
        [Required]
        [ForeignKey("Usuario")]
        public string? UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }

        public DateTime DataEmprestimo { get; set; }
    }
}
