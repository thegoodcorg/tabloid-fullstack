using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;
using System.Xml.Linq;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

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
