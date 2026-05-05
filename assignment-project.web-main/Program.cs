using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Database Connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// 2. Swagger Setup
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

// 3. CORS Policy (Must be registered BEFORE builder.Build())
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173", "http://localhost:5174") // Add 5174 here
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
});
var app = builder.Build();

// 4. Middleware Pipeline (The Order Matters!)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// UseCors MUST come after UseRouting (implicit here) and before UseAuthorization
app.UseCors("AllowReactApp");

app.UseAuthorization(); 

app.MapControllers();

app.Run();