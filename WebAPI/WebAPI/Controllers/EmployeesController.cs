using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class EmployeesController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();
        // GET: api/Employees
        public List<Employee> Get()
        {
            List<Employee> emp = db.Employees.ToList();
            return emp;
        }

        // GET: api/Employees/5
        public IHttpActionResult Get(int id)
        {
            var emp = db.Employees.SingleOrDefault(e => e.ID == id);
            return Ok(emp);
        }

        // POST: api/Employees
        public IHttpActionResult Post(Employee emp)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");
            db.Employees.Add(new Employee()
            {
                ID = emp.ID,
                FirstName = emp.FirstName,
                LastName = emp.LastName,
                Address = emp.Address,
                Email = emp.Email,
                Phone = emp.Phone
            });
            db.SaveChanges();
            return Ok();
        }

        // PUT: api/Employees/5
        public IHttpActionResult Put(int id, Employee emp)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");
            var item = db.Employees.SingleOrDefault(e => e.ID == id);
            if(item == null)
            {
                return BadRequest("Not found");
            }
            else
            {
                item.FirstName = emp.FirstName;
                item.LastName = emp.LastName;
                item.Address = emp.Address;
                item.Email = emp.Email;
                item.Phone = emp.Phone;
                db.SaveChanges();
            }
            return Ok();
        }

        // DELETE: api/Employees/5
        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid student id");

            var item = db.Employees.Where(e => e.ID == id).FirstOrDefault();
            db.Entry(item).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();

            return Ok();
        }
    }
}
