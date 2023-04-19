﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
	public interface IUserProfileRepository
	{
		List<UserProfile> GetAll();

		void Add(UserProfile userProfile);
		UserProfile GetByFirebaseUserId(string firebaseUserId);
	}
}