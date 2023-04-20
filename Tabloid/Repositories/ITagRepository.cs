using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
       public void AddTag(Tag tag);
        public List<Tag> GetAllTags();
    }
}