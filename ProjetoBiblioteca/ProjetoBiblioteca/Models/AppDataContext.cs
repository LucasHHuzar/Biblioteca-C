using Microsoft.EntityFrameworkCore;

namespace ProjetoBiblioteca.Models;

//Classe que representa o EF dentro do projeto
public class AppDataContext : DbContext
{
    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options) { }
    public DbSet<Livros> Livros { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Emprestimo> Emprestimos { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=banco_biblioteca.db");
    }
    //  protected override void OnModelCreating(ModelBuilder modelBuilder)
    //     {
    //         // Configurar relacionamento entre Usuario e Emprestimo
    //         modelBuilder.Entity<Emprestimo>()
    //             .HasOne(e => e.Usuario)
    //             .WithMany(u => u.Emprestimos)
    //             .HasForeignKey(e => e.UsuarioId);

    //         // Configurar relacionamento entre Livros e Emprestimo
    //         modelBuilder.Entity<Emprestimo>()
    //             .HasOne(e => e.Livro)
    //             .WithMany()
    //             .HasForeignKey(e => e.LivroId);
    //     }

}