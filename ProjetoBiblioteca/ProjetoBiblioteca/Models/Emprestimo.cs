namespace ProjetoBiblioteca.Models;

public class Emprestimo
{
    
    public int Id { get; set; }
    public Livros? Livro { get; set; }
    public Usuario? Usuario { get; set; }
    public DateTime DataEmprestimo { get; set; }
    
}