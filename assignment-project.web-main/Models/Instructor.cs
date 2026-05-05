namespace WebApplication1.Models;

public class Instructor
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    // One-to-Many: One instructor can have many courses
    public List<Course> Courses { get; set; } = new();
}