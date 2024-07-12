using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace finished_code.Namespace
{
   [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "character.json");

        [HttpGet]
        public async Task<ActionResult> GetAllCharacters()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                return NotFound("Character JSON file not found.");
            }

            var jsonContent = await System.IO.File.ReadAllTextAsync(_filePath);
            var characters = JsonSerializer.Deserialize<List<Character>>(jsonContent);

            return Ok(characters);
        }

        [HttpGet("random")]
        public async Task<ActionResult> GetRandomCharacter()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                return NotFound("Character JSON file not found.");
            }

            var jsonContent = await System.IO.File.ReadAllTextAsync(_filePath);
            var characters = JsonSerializer.Deserialize<List<Character>>(jsonContent);

            if (characters == null || !characters.Any())
            {
                return NotFound("No characters found.");
            }

            var random = new Random();
            var randomCharacter = characters[random.Next(characters.Count)];

            return Ok(randomCharacter);
        }
    }

}
