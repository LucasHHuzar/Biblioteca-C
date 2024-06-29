using Microsoft.EntityFrameworkCore;

namespace ProjetoBiblioteca.Models;

//Classe que representa o EF dentro do projeto
public class AppDataContext : DbContext
{
    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options) { }
    public DbSet<Livros> Livros { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Emprestimo> Emprestimos { get; set; }

    public DbSet<Devolucao> Devolucoes { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=banco_biblioteca.db");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Emprestimo>()
                .HasOne(e => e.Usuario)
                .WithMany(u => u.Emprestimos)
                .HasForeignKey(e => e.UsuarioId);

            modelBuilder.Entity<Emprestimo>()
                .HasOne(e => e.Livro)
                .WithMany(l => l.Emprestimos)
                .HasForeignKey(e => e.LivroId);

            modelBuilder.Entity<Devolucao>()
                .HasOne(d => d.Usuario)
                .WithMany()
                .HasForeignKey(d => d.UsuarioId);

            modelBuilder.Entity<Devolucao>()
                .HasOne(d => d.Livro)
                .WithMany()
                .HasForeignKey(d => d.LivroId);
        }


}