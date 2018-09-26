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

    public class ProjectController : Controller
    {
        TimelyDBContext db = new TimelyDBContext();

        [HttpGet]
        [Route("api/Project/GetProjectDetails/{id}")]
        public IEnumerable<Projects> GetProjectDetails(int id)
        {
            try
            {
                return  db.Projects.Where(p => p.ProjectId == id).Include(s => s.Sessions).ThenInclude(t => t.Tags);
            }
            catch
            {
                throw;
            }
        }
        [HttpPut]
        [Route("api/Project/ChangeProjectName")]
        public int ChangeProjectName(Projects project)
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
        [HttpDelete]
        [Route("api/Project/DeleteProject/{id}")]
        public int DeleteProject(int id)
        {
            try
            {
                
                var project = db.Projects.Where(p => p.ProjectId == id).Include(s => s.Sessions).ThenInclude(t => t.Tags);
                db.Projects.RemoveRange(project);
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