using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Cors;
using DAL;
using ZigitWebApplication.Models;

namespace ZigitWebApplication.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        DB db = new DB();
        [HttpPost]
        [Route("api/authenticate")]
        public loginResponse[] Post([FromBody]user user)
        {
            var details = db.LogIn(user.email, user.pass);
            if(details == null) return null;
            var res = new loginResponse();
            res.token = details.token;
            res.personalDetails = new personDetails();
            res.personalDetails.name = details.name;
            res.personalDetails.avatar = details.avatar;
            res.personalDetails.joinedAt = details.joinAt;
            res.personalDetails.Team = details.team;
            loginResponse[] loginResponse = { res };
            return loginResponse;
        }

        [HttpGet]
        [Route("api/Info")]
        public List<sp_GetProjects_Result> Get()
        {
            var token = Request.Headers.Authorization.Parameter.ToString();
            if (token == null) return null;
            return db.getInfo(token);
        }
    }
}
