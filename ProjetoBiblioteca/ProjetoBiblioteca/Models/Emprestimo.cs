using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoBiblioteca.Models;

public class Emprestimo
{
    private string livroId;

    public Emprestimo ()
    {   
        DataEmprestimo = DateTime.Now;
    }
    
    public Emprestimo (string livroId, string usuarioId)
    {   
        LivroId = livroId;
        UsuarioId = usuarioId;
    }
    

    public int Id { get; set; }

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