using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }
        // GET: api/<CommentController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAllComments());
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        [HttpGet("postComments")]
        public IActionResult GetCommentsByPostId(int postId)
        {
            return Ok(_commentRepository.GetCommentsByPostId(postId));
        }

        // POST api/<CommentController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
