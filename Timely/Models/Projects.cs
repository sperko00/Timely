using System;
using System.Collections.Generic;

namespace Timely.Models
{
    public partial class Projects
    {
        public Projects()
        {
            Sessions = new HashSet<Sessions>();
        }

        public int ProjectId { get; set; }
        public string Name { get; set; }
        public int IsActive { get; set; }
        public string ActivatedAt { get; set; }

        public ICollection<Sessions> Sessions { get; set; }
    }
}
