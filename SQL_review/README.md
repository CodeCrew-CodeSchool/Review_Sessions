dotnet new webapi -n SqlApiDemo
cd SqlApiDemo
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design

Update appsettings.json:

"ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SqlApiDemoDb;Trusted_Connection=True;TrustServerCertificate=True;"
  },

Create Item.cs in a Models folder:

namespace SqlApiDemo.Models;

public class Item
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

Create AppDbContext.cs in a Data folder:

using Microsoft.EntityFrameworkCore;
using SqlApiDemo.Models;

namespace SqlApiDemo.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Item> Items { get; set; }
}



Update Program.cs:

using Microsoft.EntityFrameworkCore;
using SqlApiDemo.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

Create ItemsController.cs in a Controllers folder:

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SqlApiDemo.Data;
using SqlApiDemo.Models;

namespace SqlApiDemo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ItemsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Item>> AddItem(Item item)
    {
        _context.Items.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Item>> GetItem(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null)
        {
            return NotFound();
        }
        return item;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetAllItems()
    {
        return await _context.Items.ToListAsync();
    }
}


Create the database:

dotnet ef migrations add InitialCreate
dotnet ef database update

