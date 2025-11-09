using System;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Data;

public class QuizDbContext(DbContextOptions<QuizDbContext> options) : DbContext(options)
{
    public DbSet<Question> Questions { get; set; }
    public DbSet<Participant> Participants { get; set; }

}
