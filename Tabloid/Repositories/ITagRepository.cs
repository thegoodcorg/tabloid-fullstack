using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        public void AddTag(Tag tag);
        public void DeleteTag(int tagId);
        public List<Tag> GetAllTags();
        public Tag GetTagById(int id);
        public void UpdateTag(Tag tag);
    }
}