using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizAPI.Data;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ParticipantController(QuizDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            var temp = _context.Participants
                        .Where(x => x.Name == participant.Name
                        && x.Email == participant.Email)
                        .FirstOrDefault();

            if (temp == null)
            {
                // add participant to DB
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }
            else
                temp = participant;

            return Ok(participant);
        }

    }
}
