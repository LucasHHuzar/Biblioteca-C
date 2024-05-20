namespace ProjetoBiblioteca.Models;

public class Emprestimo
{

    public int Id { get; set; }
    //public string LivroId { get; set; }
    public Livros? Livro { get; set; }
    //public int UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }
    public DateTime DataEmprestimo { get; set; }
    public DateTime? DataDevolucao { get; set; }
}