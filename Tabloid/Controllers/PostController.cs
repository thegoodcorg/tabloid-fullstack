using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ITagRepository _tagRepository;

        public PostController(IPostRepository postRepository, ITagRepository tagRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _tagRepository = tagRepository;
            _userProfileRepository = userProfileRepository;
        }

        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPosts());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            var currentUser = GetCurrentUserProfile();
            post.UserProfileId = currentUser.Id;
            post.CreateDateTime = DateTime.Now;

            if(currentUser.UserTypeId == 1) 
            {
                post.IsApproved = true;

            } 
            else
            {
                post.IsApproved = false;
            }

            _postRepository.AddPost(post);

            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
           
            if (id != post.Id)
            {
                Console.WriteLine("id: ", id, "post id: ", post.Id);
                return BadRequest();
            }

            _postRepository.EditPost(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.DeletePost(id);
            return Ok();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }



        [HttpPost("addPostTags")]
        public IActionResult AddTag(PostTag postTag)
        {

            _tagRepository.AddPostTag(postTag);
            return CreatedAtAction(nameof(Get), new { id = postTag.Id }, postTag);

        }

        [HttpPost("addImage")]
        public IActionResult addImage(string imageData)
        {
            IFormFile file = Request.Form.Files.FirstOrDefault();
            Console.WriteLine($"{imageData}");
            return Ok();
        }

    }
}
