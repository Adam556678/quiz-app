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

        [HttpGet("id")]
        public async Task<ActionResult<Question>> GetQeustion(int id)
        {
            try
            {
                var question = await _context.Questions.FindAsync(id);
                if (question == null)
                {
                    return NotFound();
                }
                return Ok(question);
            }
            catch (System.Exception ex)
            {
                Console.WriteLine($"Error fetching question : {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("id")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.QnId)
            {
                return BadRequest();
            }

            // Treat this question object as an existing record that has been edited
            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();                
            }
            catch (DbUpdateConcurrencyException) //concurrency conflict
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<Question>> RetrieveAnswers(int[] qnIds)
        {
            var answers = await _context.Questions
                .Where(x => qnIds.Contains(x.QnId))
                .Select(y => new
                {
                    QnId = y.QnId,
                    QnInWords = y.QnInWords,
                    ImageName = y.ImageName,
                    Options = new string[] { y.Option1, y.Option2, y.Option3, y.Option4 },
                    Answer = y.Answer
                }).ToListAsync();
            
            return Ok(answers);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            _context.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    
        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.QnId == id);
        }
    }
}
