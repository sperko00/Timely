using System;
using System.Collections.Generic;

namespace Timely.Models
{
    public partial class Sessions
    {
        public Sessions()
        {
            Tags = new HashSet<Tags>();
        }

        public int SessionId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Note { get; set; }
        public int ProjectId { get; set; }

        public Projects Project { get; set; }
        public ICollection<Tags> Tags { get; set; }
    }
}
