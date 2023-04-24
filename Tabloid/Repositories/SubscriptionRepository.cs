using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
	public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
	{
		public SubscriptionRepository(IConfiguration configuration) : base(configuration) { }
		public void AddSubscription(Subscription subscription)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
						INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime) 
						OUTPUT INSERTED.ID
						VALUES (@SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime)";
					DbUtils.AddParameter(cmd, "@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
					DbUtils.AddParameter(cmd, "@ProviderUserProfileId", subscription.ProviderUserProfileId);
					DbUtils.AddParameter(cmd, "@BeginDateTime", subscription.BeginDateTime);
					
					subscription.Id = (int)cmd.ExecuteScalar();
				}
			}
		}
	}
}
