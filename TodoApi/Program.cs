using Microsoft.EntityFrameworkCore;
using TodoApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add dbContext
builder.Services.AddDbContext<TodoDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

//swagger (for testing)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.UseAuthorization();
//app.MapControllers();

//Minimal Api

//Get all
app.MapGet("/api/todos", async (TodoDbContext db) =>
{
    var todos = await db.Todos.ToListAsync();
    return todos;
});

//Get By Id
app.MapGet("/api/todos/{id}", async (int id, TodoDbContext db) =>
{
    var item = await db.Todos.FindAsync(id);
    if (item != null)
    {
        return Results.Ok(item);
    }
    return Results.NotFound();
});

//Create
app.MapPost("/api/todos", async (Todo todo, TodoDbContext db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/api/todos/{todo.Id}", todo);
});

//Update
app.MapPut("/api/todos/{id}", async (int id, Todo updatedTodo, TodoDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null)
        return Results.NotFound();

    todo.Title = updatedTodo.Title;
    todo.IsCompleted = updatedTodo.IsCompleted;
    todo.DueDate = updatedTodo.DueDate;

    await db.SaveChangesAsync();
    return Results.Ok(todo);
});

//Delete 
app.MapDelete("/api/todos/{id}", async (int id, TodoDbContext db) =>
{
    var item = await db.Todos.FindAsync(id);
    if (item is null)
        return Results.NotFound();
    db.Todos.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
