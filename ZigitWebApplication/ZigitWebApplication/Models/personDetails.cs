using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZigitWebApplication.Models
{
    public class personDetails
    {
        public string Team { get; set; }
        public string name { get; set; }
        public Nullable<System.DateTime> joinedAt { get; set; }
        public string avatar { get; set; }
    }

    public class loginResponse
    {
        public string token { get; set; }
        public personDetails personalDetails { get; set; }
    }
}