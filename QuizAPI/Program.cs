using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();

builder.Services.AddDbContext<QuizDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

var app = builder.Build();


app.Run();
