using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CoursesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetCourses()
    {
        return Ok(_context.Courses.ToList());
    }

    [HttpPost]
    public IActionResult CreateCourse(Course course)
    {
        _context.Courses.Add(course);
        _context.SaveChanges();
        return Ok(course);
    }
}