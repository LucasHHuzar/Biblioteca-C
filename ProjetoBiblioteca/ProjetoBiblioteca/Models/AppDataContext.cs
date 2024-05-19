using Microsoft.EntityFrameworkCore;

namespace ProjetoBiblioteca.Models;

//Classe que representa o EF dentro do projeto
public class AppDataContext : DbContext
{
    //public BibliotecaContexto(DbContextOptions<BibliotecaContexto> options) : base(options) { }
    public DbSet<Livros> Livros { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Emprestimo> Emprestimos { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=banco_biblioteca.db");
    }

}