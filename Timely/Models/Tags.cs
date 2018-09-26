using System;
using System.Collections.Generic;

namespace Timely.Models
{
    public partial class Tags
    {
        public int TagId { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public int SessionId { get; set; }

        public Sessions Session { get; set; }
    }
}
