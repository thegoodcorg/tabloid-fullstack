using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
           
            _tagRepository.AddTag(tag);
            return CreatedAtAction(nameof(Get), new { id = tag.Id }, tag);
        }


        //[HttpPost]
        //public IActionResult Post(Tag tag)
        //{
        //    var currentUserProfile = GetCurrentUserProfile();
        //    if (currentUserProfile.UserType.Name != "admin")
        //    {
        //        return Unauthorized();
        //    }
        //    quote.UserProfileId = currentUserProfile.Id;
        //    _quoteRepository.Add(quote);
        //    return CreatedAtAction(nameof(Get), new { id = quote.Id }, quote);
        //}

        //private UserProfile GetCurrentUserProfile()
        //{
        //    var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        //    return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        //}
    }
}
