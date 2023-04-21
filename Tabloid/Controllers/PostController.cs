using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        private readonly ITagRepository _tagRepository;

        public PostController(IPostRepository postRepository, ITagRepository tagRepository)
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
            post.IsApproved = true;

            _postRepository.AddPost(post);

            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }



        [HttpPost]
        public IActionResult AddTag(PostTag postTag)
        {

            _tagRepository.AddPostTag(postTag);
            return CreatedAtAction(nameof(Get), new { id = postTag.Id }, postTag);

        }
    }
}
