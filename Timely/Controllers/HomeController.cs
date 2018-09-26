using System;
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
    
    public class HomeController : Controller
    {
       TimelyDBContext db = new TimelyDBContext();

        [HttpGet]
        [Route("api/Home/GetAllProjects")]
        public IEnumerable<Projects> GetAllProjects()
        {
            try
            {
                return db.Projects;
            }
            catch
            {
                throw;
            }
        }
        [HttpPost]
        [Route("api/Home/AddProject")]
        public int AddProject(Projects project)
        {
            try
            {
                db.Projects.Add(project);
                db.SaveChanges();
                return project.ProjectId;
            }
            catch
            {
                throw;
            }
        }
        [HttpPut]
        [Route("api/Home/ActivateProject")]
        public int ActivateProject(Projects project)
        {
            try
            {
                db.Entry(project).State = EntityState.Modified;
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