using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization; // Added for security
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[Route("api/[controller]")]
[ApiController]
// [Authorize] // Uncomment this line if your assignment requires authentication
public class StudentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public StudentsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Students
    [HttpGet]
    public IActionResult GetStudents()
    {
        var students = _context.Students.ToList();
        return Ok(students);
    }

    // ADDED: POST: api/Students
    [HttpPost]
    public IActionResult CreateStudent(Student student)
    {
        _context.Students.Add(student);
        _context.SaveChanges(); // This pushes the new student to your SQL table
        return Ok(student);
    }
}