using System.ComponentModel.DataAnnotations;

namespace ProjetoBiblioteca.Models;


public class Livros
{
    public Livros ()
    {   
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }

    public Livros 
        (string titulo, string autor, int anoPublicacao, string genero, int exemplaresDisponiveis)
    {
        Titulo = titulo;
        Autor = autor;
        AnoPublicacao = anoPublicacao;
        Genero = genero;
        ExemplaresDisponiveis = exemplaresDisponiveis;
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;

    }



    public string? Id { get; set; }
    public string? Titulo { get; set; }
    public string? Autor { get; set; }
    public int AnoPublicacao { get; set; }
    public string? Genero { get; set; }
    public int ExemplaresDisponiveis { get; set; }
   
    public DateTime CriadoEm { get; set; }

}