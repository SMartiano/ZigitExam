using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DB
    {
        DBZigitExamEntities context = new DBZigitExamEntities();

        public sp_Login_Result LogIn(string email, string pass)
        {

            sp_Login_Result result =  context.sp_Login(email, pass).Select(e=>e).FirstOrDefault();

            return result;
        }

        public List<sp_GetProjects_Result> getInfo(string token)
        {

            List<sp_GetProjects_Result> result = context.sp_GetProjects(token).Select(e => e).ToList();

            return result;
        }


    }
}
