﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
	public interface ISubscriptionRepository
	{
		void AddSubscription(Subscription subscription);
		List<Subscription> GetAllSubscriptions();
		List<int> GetSubscribedPostIdsByFirebaseId(string firebaseId);
	}
}