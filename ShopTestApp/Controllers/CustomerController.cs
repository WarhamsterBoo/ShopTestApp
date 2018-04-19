using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web.Mvc;
using PagedList;
using ShopTestApp.DAL;
using ShopTestApp.Models;
using ShopTestApp.Models.ViewModels;

namespace ShopTestApp.Controllers
{
    [Authorize(Roles = "admin, manager")]
    public class CustomerController : Controller
    {
        private UnitOfWork uw = new UnitOfWork();

        // GET: Customer
        public JsonResult Index(int? page, int? start, int? limit, string filter)
        {
            Expression<Func<Customer, bool>> filterExpression = FilterBuilder.Build<Customer>(filter);

            int pageSize = (limit ?? 20);
            int pageNumber = (page ?? 1);

            var filteredCustomers = uw.CustomerRepositoty.Get(filterExpression);

            int total = filteredCustomers.Count();
            var res = filteredCustomers
                .Select(c => c.ToViewModel(uw.UserRepositoty.Get(e => e.Customer_Id == c.ID).FirstOrDefault()))
                .ToPagedList(pageNumber, pageSize);

            return Json(new CustomerList() { Success = true, ResponseText = "OK", Total = total, Customers = res }, JsonRequestBehavior.AllowGet);
        }

        // POST: Customer/Create
        [HttpPost]
        public async Task<JsonResult> Create(CreateCustomerViewModel customer)
        {
            if (!ModelState.IsValid)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad request" }, JsonRequestBehavior.AllowGet);
            }

            var customerToCreate = customer.GetCustomerModel();
            Guid newCustomerId = Guid.NewGuid();
            customerToCreate.ID = newCustomerId;

            uw.CustomerRepositoty.Insert(customerToCreate);

            var user = new ApplicationUser {
                UserName = customer.Email,
                Email = customer.Email,
                Customer_Id = newCustomerId
            };

            try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Failed to save changes: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
            }

            var userCreateResult = await uw.UserManager.CreateAsync(user, customer.Password);
            if (!userCreateResult.Succeeded)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Failed to add User for Customer" }, JsonRequestBehavior.AllowGet);
            }

            var addToRoleResult = await uw.UserManager.AddToRoleAsync(user.Id, "customer");
            if (!addToRoleResult.Succeeded)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Failed to add Roles for User" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" }, JsonRequestBehavior.AllowGet);
        }

        // GET: Product/Details
        public JsonResult Details(Guid? id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }
            CustomerViewModel customer = uw.CustomerRepositoty.GetById(id).ToViewModel(uw.UserRepositoty.Get(e => e.Customer_Id == id).FirstOrDefault());
            if (customer == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new CustomerDetailsViewModel() { Success = true, ResponseText = "OK", Customer = customer }, JsonRequestBehavior.AllowGet);
        }

        // POST: Customer/Edit
        [HttpPost]
        public JsonResult Edit(CustomerViewModel customer)
        {
            if (!ModelState.IsValid)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }

            Customer customerToUpdate = uw.CustomerRepositoty.GetById(customer.ID);

            if (customerToUpdate == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }

            customerToUpdate.UpdateFromModel(customer);
            uw.CustomerRepositoty.Update(customerToUpdate);

            try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Failed to save changes: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
            }

            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" }, JsonRequestBehavior.AllowGet);
        }

        // GET: Customer/Delete
        public async Task<JsonResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }

            Customer customer = uw.CustomerRepositoty.GetById(id);

            if (customer == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }

            uw.CustomerRepositoty.Delete(id);

            var userToDelete = uw.UserRepositoty.Get(u => u.Customer_Id == customer.ID).FirstOrDefault();
            if (userToDelete != null)
            {
                var user = await uw.UserManager.DeleteAsync(userToDelete);
            }

            try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Failed to save changes: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
            }

            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                uw.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
