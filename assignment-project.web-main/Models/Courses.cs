namespace WebApplication1.Models;

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int InstructorId { get; set; } // Foreign Key
    public Instructor? Instructor { get; set; }
    
    // Optional: Add this if you want to show a relationship to Students
    public List<Student> Students { get; set; } = new List<Student>();
}
