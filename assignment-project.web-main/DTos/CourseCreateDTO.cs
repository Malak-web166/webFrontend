using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTOs;

public class CourseCreateDTO
{
    [Required(ErrorMessage = "Course title is mandatory")]
    [StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public int InstructorId { get; set; }
}