//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    
    public partial class sp_Login_Result
    {
        public int ID { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string token { get; set; }
        public string avatar { get; set; }
        public string name { get; set; }
        public string team { get; set; }
        public Nullable<System.DateTime> joinAt { get; set; }
    }
}