using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
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

		public List<Subscription> GetAllSubscriptions()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"SELECT * FROM Subscription";
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var subscriptions = new List<Subscription>();
						while (reader.Read())
						{
							var subscription = new Subscription()
							{
								Id = DbUtils.GetInt(reader, "Id"),
								SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
								ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
								BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
							};
							if (DbUtils.IsNotDbNull(reader, "EndDateTime"))
							{
								subscription.EndDateTime = DbUtils.GetDateTime(reader, "EndDateTime");
							}
							subscriptions.Add(subscription);
						}
						reader.Close();
						return subscriptions;
					}
				}
			}
		}

		public List<int> GetSubscribedPostIdsByFirebaseId(string firebaseId)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
									SELECT p.Id AS PostId FROM Subscription AS s LEFT JOIN UserProfile AS up ON s.SubscriberUserProfileId = up.Id 
									JOIN Post AS p ON p.UserProfileId = s.ProviderUserProfileId
									WHERE up.FirebaseUserId = @FirebaseId;";
					cmd.Parameters.AddWithValue("@FirebaseId", firebaseId);

					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						var postIds = new List<int>();
						while (reader.Read())
						{
							int id = DbUtils.GetInt(reader, "PostId");
							postIds.Add(id);
						}
						reader.Close();

						return postIds;
					}
				}
			}
		}
	}
}
