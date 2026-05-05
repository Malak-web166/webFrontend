namespace WebApplication1.Models;

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    // --- The Link (Objective 17) ---
    public int CourseId { get; set; } // This is the Foreign Key
    public Course? Course { get; set; } // This is the Navigation Property
}