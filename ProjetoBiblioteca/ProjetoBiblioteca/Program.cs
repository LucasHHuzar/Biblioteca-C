using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using ProjetoBiblioteca.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);

// Registrar o serviço de banco de dados da aplicação
builder.Services.AddDbContext<AppDataContext>();

// Adicionar serviços necessários para a API (como controladores)
builder.Services.AddControllers();

var app = builder.Build();

//Listar
//GET: http://localhost:5077/api/Livros/listar
app.MapGet("/api/livros/listar", ([FromServices] AppDataContext ctx) =>
{

    if (ctx.Livros.Any())
    {
        return Results.Ok(ctx.Livros.ToList());
    }

    return Results.NotFound("Tabela vazia!");

});

//Buscar
//GET: http://localhost:5077/api/Livros/buscar/
app.MapGet("/api/livros/buscar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    //Expressão lambda em C#
    Livros? livros = ctx.Livros.FirstOrDefault(x => x.Id == id);
    
    if(livros is null)
    {
        return Results.NotFound("Livro não encontrado!");
    }

    //Produto não encontrado é após o laço de repetição
    return Results.Ok(livros);
});

//Cadastrar
//POST: http://localhost:****/api/Livros/cadastrar/
app.MapPost("/api/livros/cadastrar", ([FromBody] Livros livros, [FromServices] AppDataContext ctx) =>
{
    //Valdação dos atributos do produto
    List<ValidationResult> erros = new List<ValidationResult>();

    if(!Validator.TryValidateObject(livros, new ValidationContext(livros), erros, true))
    {
        return Results.BadRequest(erros);
    }

    //Regra de Negócio - Não permitir produtos com o mesmo nome
    Livros? livrosBuscado = ctx.Livros.FirstOrDefault(x => x.Titulo == livros.Titulo);

    if(livrosBuscado is not null)
    {
        return Results.BadRequest("Já existe um livro com o mesmo nome");
    }

    //Adicionar o produto dentro do banco de dados""
    ctx.Livros.Add(livros);
    ctx.SaveChanges();

    return Results.Created("", livros);

});

//POST: http://localhost:5077/api/Usuario/cadastrar/
app.MapPost("/api/usuario/cadastrar", ([FromBody] Usuario usuarios, [FromServices] AppDataContext ctx) =>
{
    //Valdação dos atributos do produto
    List<ValidationResult> erros = new List<ValidationResult>();

    if(!Validator.TryValidateObject(usuarios, new ValidationContext(usuarios), erros, true))
    {
        return Results.BadRequest(erros);
    }

    //Regra de Negócio - Não permitir produtos com o mesmo nome
    Usuario? usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.Nome == usuarios.Nome);

    if(usuarioBuscado is not null)
    {
        return Results.BadRequest("Já existe um usuário com o mesmo nome.");
    }

    //Adicionar o usuario dentro do banco de dados
    ctx.Usuarios.Add(usuarios);
    ctx.SaveChanges();

    return Results.Created("", usuarios);

});

//GET: http://localhost:5077/api/Usuario/listar
app.MapGet("/api/usuario/listar", ([FromServices] AppDataContext ctx) =>
{

    if (ctx.Usuarios.Any())
    {
        return Results.Ok(ctx.Usuarios.ToList());
    }

    return Results.NotFound("Tabela vazia!");

});

//DELETE: http://localhost:5077/api/Livros/deletar/
app.MapDelete("/api/livros/deletar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) => 
{
    Livros? livros = ctx.Livros.Find(id);

    if(livros is null)
    {
        return Results.NotFound("Livro não encontrado!"); 
    }
    
    ctx.Livros.Remove(livros);
    ctx.SaveChanges();

    return Results.Ok("Livro removido com sucesso!");

});

// DEEM UMA OLHADA NESSE DE ALTERAR POIS NAO SEI SE ESTA CORRETO

//Alterar
//PUT: http://localhost:5134/api/Livros/alterar/
// app.MapPut("/api/livros/alterar/{id}", ([FromRoute] string id,[FromBody] Livros livrosAlterado,
// [FromServices] AppDataContext ctx) => 
// {
//     Livros? livros = ctx.Livros.Find(id);
//     Autor? autor = ctx.Livros.Find(nome);

//     if(livros is null)
//     {
//         return Results.NotFound("Livro não encontrado!"); 
//     }
    
//     livros.Id = livrosAlterado.Id;
//     livros.Titulo = livrosAlterado.Titulo;
//     livros.AnoPublicacao = livrosAlterado.AnoPublicacao;

//     ctx.Produtos.Update(produto);
//     ctx.SaveChanges();

//     return Results.Ok("Produto alterado com sucesso!");

// });

app.Run();
