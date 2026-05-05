using Microsoft.EntityFrameworkCore;
using WebApplication1.Models; // This allows the context to see your entities

namespace WebApplication1.Data;

public class AppDbContext : DbContext
{
    // Objective 23: Constructor for Dependency Injection
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Objective 17 & 18: Define the tables for your database
    public DbSet<Instructor> Instructors { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }

    // This section is where you explicitly define relationships if needed
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
