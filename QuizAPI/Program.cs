using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Register controllers
builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<QuizDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

var app = builder.Build();

app.UseCors(options =>
    options.WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader());

// Map the controllers
app.MapControllers();

app.Run();
