using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;
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
                                                       up.DisplayName, c.Name, t.Name as TagName
                                                FROM POST as p
                                                LEFT JOIN UserProfile as up ON p.UserProfileId = up.Id
                                                LEFT JOIN Category as c ON p.CategoryId = c.Id
                                                LEFT JOIN postTag pt on pt.PostId = p.Id
                                                LEFT JOIN Tag t on pt.TagId = t.Id
                                                ORDER BY p.PublishDateTime DESC";
                    var posts = new List<Post>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var postId = DbUtils.GetInt(reader, "Id");
                        var post = posts.FirstOrDefault(p => p.Id == postId);
                        if (post == null)
                        {
                            post = new Post
                            {
                                Id = postId,
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
                                },
                                Tags = new List<Tag>()
                            };
                            posts.Add(post);
                        }
                        if (!reader.IsDBNull(reader.GetOrdinal("TagName")))
                        {
                            post.Tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "TagName")
                            });
                        }
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
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, Title, Content, p.ImageLocation, p.CreateDateTime,
                                                     PublishDateTime, CategoryId, UserProfileId, IsApproved,
                                               up.DisplayName, c.Name, t.Name as TagName, up.FirstName, up.LastName, up.Email
                                        FROM POST as p
                                        LEFT JOIN UserProfile as up ON p.UserProfileId = up.Id
                                        LEFT JOIN Category as c ON p.CategoryId = c.Id
                                        LEFT JOIN postTag pt on pt.PostId = p.Id
                                        LEFT JOIN Tag t on pt.TagId = t.Id
                                        WHERE p.Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    Post post = null;
                    List<Tag> tags = new List<Tag>();
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
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email")
                            },
                            Category = new Category()
                            {
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            Tags = tags
                        };
                        if (!reader.IsDBNull(reader.GetOrdinal("TagName")))
                        {
                            tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "TagName")
                            });
                        }
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


        public void EditPost(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Post 
                                        SET Title = @title,
                                            Content = @content,
                                            ImageLocation = @imageLocation, 
                                            PublishDateTime = @publishDateTime,                                           
                                            CategoryId = @categoryId   
                                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", post.Id);
                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@imageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@publishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);

                    cmd.ExecuteNonQuery();


                }
            }
        }

        public void DeletePost(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Comment WHERE PostId = @id;
                                        DELETE FROM Post WHERE Id = @id; ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
