using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SubscriptionController : ControllerBase
	{
		private readonly IPostRepository _postRepository;
		private readonly IUserProfileRepository _userProfileRepository;
		public SubscriptionController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
		{
			_postRepository = postRepository;
			_userProfileRepository = userProfileRepository;
		}

		[HttpPost]
		public IActionResult Post(Subscription subscription)
		{
			var currentUser = GetCurrentUserProfile();
			_postRepository.AddSubscription(subscription);

			return Ok();
		}

		private UserProfile GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
		}
	}
}
