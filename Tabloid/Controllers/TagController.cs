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
        //public IActionResult PostPostTag(PostTag postTag)
        //{

        //    _tagRepository.AddPostTag(postTag);
        //    return CreatedAtAction(nameof(Get), new { id = postTag.Id }, postTag);
        //}

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepository.UpdateTag(tag);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.DeleteTag(id);
            return NoContent();
        }
    }
}
