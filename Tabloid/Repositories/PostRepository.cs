using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, Title, Content, p.ImageLocation, p.CreateDateTime,  
                                                     PublishDateTime, CategoryId, UserProfileId, IsApproved,  
                                               up.DisplayName, c.Name
                                        FROM POST as p
                                        LEFT JOIN UserProfile as up ON p.UserProfileId = up.Id
                                        LEFT JOIN Category as c ON p.CategoryId = c.Id
                                        ORDER BY p.PublishDateTime DESC";

                    var posts = new List<Post>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        posts.Add(new Post
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            },
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            }

                        }) ; ;
                    }
                    reader.Close();

                    return posts;
                }
            }

        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, Title, Content, p.ImageLocation, p.CreateDateTime,  
                                                     PublishDateTime, CategoryId, UserProfileId, IsApproved,  
                                               up.DisplayName, c.Name
                                        FROM POST as p
                                        LEFT JOIN UserProfile as up ON p.UserProfileId = up.Id
                                        LEFT JOIN Category as c ON p.CategoryId = c.Id  
                                        WHERE p.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    while (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            },
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            }

                        }; 
                    }
                    reader.Close();

                    return post;
                }
            }
        }

        public void AddPost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Post (Title, Content, ImageLocation, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@title, @content, @imageLocation, @createDateTime, @publishDateTime, @isApproved, @categoryId, @userProfileId )";
                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@imageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@createDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@publishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@isApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@userProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();


                }
            }
        }



        public List<Tag> GetTagsByPostId(int postId)
        {

            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT t.Id, t.Name
                FROM Tag t
                INNER JOIN PostTag pt ON t.Id = pt.TagId
                WHERE pt.PostId = @postId";

                    cmd.Parameters.AddWithValue("@postId", postId);

                    using (var reader = cmd.ExecuteReader())
                    {

                        List<Tag> tags = new List<Tag>();
                        while (reader.Read())
                        {
                            Tag tag = new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            };
                            tags.Add(tag);
                        }

                        return tags;
                    }
                }
            }
        }


    }
}
