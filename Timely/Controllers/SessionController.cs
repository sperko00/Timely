using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Timely.Models;

namespace Timely.Controllers
{
    public class SessionController : Controller
    {
        TimelyDBContext db = new TimelyDBContext();

        [HttpPost]
        [Route("api/Session/AddSession")]
        public int AddSession(Sessions session)
        {
            try
            {
                db.Sessions.Add(session);
                db.SaveChanges();
                return session.SessionId;
            }
            catch
            {
                throw;
            }
        }

        [HttpPut]
        [Route("api/Session/UpdateSession")]
        public int UpdateSession(Sessions session)
        {
            try
            {
                db.Entry(session).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        [HttpPost]
        [Route("api/Session/UpdateTags")]
        public int UpdateTags(Tags tag)
        {
            try
            {
                db.Tags.Add(tag);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}