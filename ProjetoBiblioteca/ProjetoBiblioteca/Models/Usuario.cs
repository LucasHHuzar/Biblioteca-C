namespace ProjetoBiblioteca.Models;

public class Usuario
{
    public Usuario ()
    {
        Emprestimos = new List<Emprestimo>();
    }

    public Usuario 
    (string nome, string telefone)
    {
        Nome = nome;
        Telefone = telefone;
        Emprestimos = new List<Emprestimo>();
    }

    public string? Id { get; set; } = Guid.NewGuid().ToString();
    public string? Nome { get; set; }
    public string? Telefone { get; set; }
    public ICollection<Emprestimo> Emprestimos { get; set; } = [];
}