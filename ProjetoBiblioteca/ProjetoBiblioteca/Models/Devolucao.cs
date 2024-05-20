namespace ProjetoBiblioteca.Models;

public class Devolucao
{
    public string? Id { get; set; }
    public Livros? Livro { get; set; }
    public Usuario? Usuario { get; set; }
    public DateTime? DataDevolucao { get; set; }
}