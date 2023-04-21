using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllComments();
        List<Comment> GetCommentsByPostId(int postId);
        public void AddComment(Comment comment);
    }
}