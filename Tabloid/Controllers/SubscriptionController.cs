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
		private readonly ISubscriptionRepository _subscriptionRepository;
		public SubscriptionController(IPostRepository postRepository, IUserProfileRepository userProfileRepository, ISubscriptionRepository subscriptionRepository)
		{
			_postRepository = postRepository;
			_userProfileRepository = userProfileRepository;
			_subscriptionRepository = subscriptionRepository;
		}

		[HttpPost]
		public IActionResult Post(Subscription subscription)
		{
			var currentUser = GetCurrentUserProfile();
			_subscriptionRepository.AddSubscription(subscription);

			return Ok(subscription);
		}

		[HttpGet]
		public IActionResult GetAllSubscriptions()
		{
			var allSubscriptions = _subscriptionRepository.GetAllSubscriptions();
			return Ok(allSubscriptions);
		}

		[HttpGet("{firebaseId}")]
		public IActionResult GetSubscribedPostsByFirebaseId(string firebaseId)
		{
			var subscribedPosts = _subscriptionRepository.GetSubscribedPostIdsByFirebaseId(firebaseId);
			return Ok(subscribedPosts);
		}

		private UserProfile GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
		}
	}
}
