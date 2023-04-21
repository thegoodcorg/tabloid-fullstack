using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserProfileController : ControllerBase
	{
		private readonly IUserProfileRepository _userProfileRepository;
		public UserProfileController(IUserProfileRepository userProfileRepository)
		{
			_userProfileRepository = userProfileRepository;
		}

		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_userProfileRepository.GetAll());
		}

		[HttpGet("details/{userId}")]
		public IActionResult GetUserProfileById(string userId)
		{
			return Ok(_userProfileRepository.GetById(userId));
		}

		[HttpGet("{firebaseUserId}")]
		public IActionResult GetUserProfile(string firebaseUserId)
		{
			return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
		}

		[HttpGet("DoesUserExist/{firebaseUserId}")]
		public IActionResult DoesUserExist(string firebaseUserId)
		{
			var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
			if (userProfile == null)
			{
				return NotFound();
			}
			return Ok();
		}

		[HttpPost]
		public IActionResult Post(UserProfile userProfile)
		{
			userProfile.CreateDateTime = DateTime.Now;
			userProfile.UserTypeId = UserType.AUTHOR_ID;
			_userProfileRepository.Add(userProfile);
			return CreatedAtAction(
				nameof(GetUserProfile),
				new { firebaseUserId = userProfile.FirebaseUserId },
				userProfile);
		}

		[HttpGet("Me")]
		public IActionResult Me()
		{
			var userProfile = GetCurrentUserProfile();
			if (userProfile == null)
			{
				return NotFound();
			}

			return Ok(userProfile);
		}

		[HttpPatch("deactivate/{userId}")]
		public IActionResult DeactivateUser(string userId)
		{
			_userProfileRepository.DeactivateUser(userId);
			return Ok();
		}

		private UserProfile GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
		}



	}
}
