namespace ProjetoBiblioteca.Models;

public class Usuario
{
    public Usuario ()
    {
        Id = Guid.NewGuid().ToString();
    }

    public Usuario 
    (string nome, string telefone)
    {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
        Telefone = telefone;
    }

    public string? Id { get; set; }
    public string? Nome { get; set; }
    public string? Telefone { get; set; }
     public ICollection<Emprestimo> Emprestimos { get; set; }
}