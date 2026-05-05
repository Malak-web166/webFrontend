using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InstructorsController : ControllerBase
{
    private readonly AppDbContext _context;

    public InstructorsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetInstructors()
    {
        return Ok(_context.Instructors.ToList());
    }

    [HttpPost]
    public IActionResult CreateInstructor(Instructor instructor)
    {
        _context.Instructors.Add(instructor);
        _context.SaveChanges();
        return Ok(instructor);
    }
}