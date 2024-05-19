namespace ProjetoBiblioteca.Models;

public class Emprestimo
{

    public int Id { get; set; }
    public int LivroId { get; set; }
    public Livros livro { get; set; }
    public int UsuarioId { get; set; }
    public Usuario usuario { get; set; }
    public DateTime DataEmprestimo { get; set; }
    public DateTime? DataDevolucao { get; set; }
}