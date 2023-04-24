using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void AddPost(Post post);
        void DeletePost(int id);
        void EditPost(Post post);
        List<Post> GetAllPosts();
        Post GetPostById(int id);
	}
}