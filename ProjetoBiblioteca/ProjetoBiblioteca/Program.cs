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
builder.Services.AddDbContext<AppDataContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adicionar serviços necessários para a API (como controladores)
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});


builder.Services.AddCors(options => options.AddPolicy("Acesso Total",
configs => configs.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

app.MapControllers();

//Listar
//GET: http://localhost:5077/api/livros/listar
app.MapGet("/api/livros/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Livros.Any())
    {
        return Results.Ok(ctx.Livros.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//Buscar
//GET: http://localhost:5077/api/livros/buscar/{titulo}
app.MapGet("/api/livros/buscar/{titulo}", ([FromRoute] string titulo, [FromServices] AppDataContext ctx) =>
{
    Livros? livros = ctx.Livros.FirstOrDefault(x => x.Titulo == titulo);
    if (livros is null)
    {
        return Results.NotFound("Livro não encontrado!");
    }
    return Results.Ok(livros);
});

//Cadastrar
//POST: http://localhost:5077/api/livros/cadastrar
app.MapPost("/api/livros/cadastrar", ([FromBody] Livros livros, [FromServices] AppDataContext ctx) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(livros, new ValidationContext(livros), erros, true))
    {
        return Results.BadRequest(erros);
    }

    Livros? livrosBuscado = ctx.Livros.FirstOrDefault(x => x.Titulo == livros.Titulo);
    if (livrosBuscado is not null)
    {
        return Results.BadRequest("Já existe um livro com o mesmo nome");
    }

    ctx.Livros.Add(livros);
    ctx.SaveChanges();
    return Results.Created("", livros);
});

//Alterar
//PUT: http://localhost:5077/api/livros/alterar/{id}
app.MapPut("/api/livros/alterar/{id}", ([FromRoute] string id, [FromBody] Livros livros, [FromServices] AppDataContext ctx) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(livros, new ValidationContext(livros), erros, true))
    {
        return Results.BadRequest(erros);
    }

    Livros? livrosBuscado = ctx.Livros.Find(id);
    if (livrosBuscado is null)
    {
        return Results.NotFound("Livro não encontrado");
    }

    livrosBuscado.Titulo = livros.Titulo;
    livrosBuscado.Autor = livros.Autor;
    livrosBuscado.AnoPublicacao = livros.AnoPublicacao;
    livrosBuscado.Genero = livros.Genero;
    livrosBuscado.ExemplaresDisponiveis = livros.ExemplaresDisponiveis;
    
    ctx.SaveChanges();
    return Results.Ok(livrosBuscado);
});

//Cadastrar Empréstimo
//POST: http://localhost:5077/api/emprestimo/cadastrar
app.MapPost("/api/emprestimo/cadastrar", ([FromBody] Emprestimo emprestimo, [FromServices] AppDataContext ctx) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(emprestimo, new ValidationContext(emprestimo), erros, true))
    {
        return Results.BadRequest(erros);
    }

    Usuario? usuario = ctx.Usuarios.Find(emprestimo.UsuarioId);
    if (usuario == null)
    {
        return Results.BadRequest("Usuário não encontrado.");
    }

    Livros? livro = ctx.Livros.Find(emprestimo.LivroId);
    if (livro == null)
    {
        return Results.BadRequest("Livro não encontrado.");
    }
    
    // emprestimo.Id = Guid.NewGuid().ToString();
    // emprestimo.DataEmprestimo = DateTime.Now;
    ctx.Emprestimos.Add(emprestimo);
    ctx.SaveChanges();

    return Results.Ok("Empréstimo realizado!");
});

//Cadastrar Usuário
//POST: http://localhost:5077/api/usuario/cadastrar
app.MapPost("/api/usuario/cadastrar", ([FromBody] Usuario usuario, [FromServices] AppDataContext ctx) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(usuario, new ValidationContext(usuario), erros, true))
    {
        return Results.BadRequest(erros);
    }

    Usuario? usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.Nome == usuario.Nome);
    if (usuarioBuscado is not null)
    {
        return Results.BadRequest("Já existe um usuário com o mesmo nome.");
    }

    ctx.Usuarios.Add(usuario);
    ctx.SaveChanges();
    return Results.Created("", usuario);
});

//Listar Usuários
//GET: http://localhost:5077/api/usuario/listar
app.MapGet("/api/usuario/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Usuarios.Any())
    {
        return Results.Ok(ctx.Usuarios.ToList());
    }
    return Results.NotFound("Tabela vazia!");
});

//Buscar Usuário
//GET: http://localhost:5077/api/usuario/buscar/{nome}
app.MapGet("/api/usuario/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.FirstOrDefault(x => x.Nome == nome);
    if (usuario is null)
    {
        return Results.NotFound("Usuário não encontrado!");
    }
    return Results.Ok(usuario);
});

//Deletar Livro
//DELETE: http://localhost:5077/api/livros/deletar/{id}
app.MapDelete("/api/livros/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Livros? livros = ctx.Livros.Find(id);
    if (livros is null)
    {
        return Results.NotFound("Livro não encontrado!");
    }

    ctx.Livros.Remove(livros);
    ctx.SaveChanges();
    return Results.Ok("Livro removido com sucesso!");
});

//Deletar Usuário
//DELETE: http://localhost:5077/api/usuario/deletar/{id}
app.MapDelete("/api/usuario/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    Usuario? usuario = ctx.Usuarios.Find(id);
    if (usuario is null)
    {
        return Results.NotFound("Usuário não encontrado!");
    }

    ctx.Usuarios.Remove(usuario);
    ctx.SaveChanges();
    return Results.Ok("Usuário removido com sucesso!");
});

//Cadastrar Devolução
//POST: http://localhost:5077/api/devolucao/cadastrar
app.MapPost("/api/devolucao/cadastrar", ([FromBody] Devolucao devolucao, [FromServices] AppDataContext ctx) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(devolucao, new ValidationContext(devolucao), erros, true))
    {
        return Results.BadRequest(erros);
    }

    Usuario? usuario = ctx.Usuarios.Find(devolucao.UsuarioId);
    if (usuario == null)
    {
        return Results.BadRequest("Usuário não encontrado.");
    }

    Livros? livro = ctx.Livros.Find(devolucao.LivroId);
    if (livro == null)
    {
        return Results.BadRequest("Livro não encontrado.");
    }

    ctx.Devolucoes.Add(devolucao);
    ctx.SaveChanges();

    return Results.Ok("Devolução realizada!");
});

app.UseCors("Acesso Total");

app.Run();