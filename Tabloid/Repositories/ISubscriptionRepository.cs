using Tabloid.Models;

namespace Tabloid.Repositories
{
	public interface ISubscriptionRepository
	{
		void AddSubscription(Subscription subscription);
	}
}