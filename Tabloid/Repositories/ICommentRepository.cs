using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllComments();
        List<Comment> GetCommentsByPostId(int postId);
        Comment GetCommentById(int id);
        public void AddComment(Comment comment);
        public void Delete(int id); 
        public void EditComment(Comment comment);
    }
}