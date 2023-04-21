using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IPostRepository _postRepository;


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            Console.WriteLine(firebaseUserId);
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userRepository;
        }
        // GET: api/<CommentController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAllComments());
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok();
        }

        [HttpGet("postComments")]
        public IActionResult GetCommentsByPostId(int postId)
        {
            return Ok(_commentRepository.GetCommentsByPostId(postId));
        }

        // POST api/<CommentController>
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            var currentUser = GetCurrentUserProfile();
            comment.UserProfileId = currentUser.Id;
            comment.CreateDateTime = DateTime.Now;
            comment.Subject = "testing";

            _commentRepository.AddComment(comment);
            return Ok(comment);

            //   return CreatedAtAction("Get", new { id = comment.PostId }, comment);
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }
    }
}
