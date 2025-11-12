using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            try
            {
                var random5Qns = await _context.Questions
                    .Select(x => new
                    {
                        QnId = x.QnId,
                        QnInWords = x.QnInWords,
                        ImageName = x.ImageName,
                        options = new string[] { x.Option1, x.Option2, x.Option3, x.Option4 }
                    })
                    .OrderBy(y => Guid.NewGuid())
                    .Take(5)
                    .ToListAsync();

                return Ok(random5Qns);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine($"Error fetching questions : {ex.Message}");           
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }
    }
}
