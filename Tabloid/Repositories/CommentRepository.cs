using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;
using System.ComponentModel;
using System.Xml.Linq;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Comment (PostId, UserProfileId, Subject, Content, CreateDateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES (@PostId, @UserProfileId, @Subject, @Content, @CreateDateTime )";
                    DbUtils.AddParameter(cmd, "@PostId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@createDateTime", comment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);


                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    List<Comment> comments = new List<Comment>();
                    cmd.CommandText = @"
                                        SELECT 
                                            Id, 
                                            PostId, 
                                            UserProfileId, 
                                            Subject, 
                                            Content, 
                                            CreateDateTime 
                                        FROM Comment";
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        };
                        comments.Add(comment);
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public List<Comment> GetCommentsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    List<Comment> postComments = new List<Comment>();
                    cmd.CommandText = @"
                                        SELECT 
                                            Id, 
                                            PostId, 
                                            UserProfileId, 
                                            Subject, 
                                            Content, 
                                            CreateDateTime 
                                        FROM Comment
                                        WHERE PostId = @postId";
                    DbUtils.AddParameter(cmd, "@postId", postId);
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {

                        var comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        };
                        postComments.Add(comment);
                    }
                    reader.Close();
                    return postComments;
                }
            }
        }
    }

}
