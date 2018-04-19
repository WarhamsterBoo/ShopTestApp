using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using PagedList;
using ShopTestApp.DAL;
using ShopTestApp.Models;
using ShopTestApp.Models.ViewModels;

namespace ShopTestApp.Controllers
{
    [Authorize(Roles = "admin")]
    public class ManageController : Controller
    {
        private UnitOfWork uw = new UnitOfWork();

        //GET: /Account
        public JsonResult Index(int? page, int? start, int? limit, string filter)
        {
            Expression<Func<ApplicationUser, bool>> filterExpression = FilterBuilder.Build<ApplicationUser>(filter);

            int pageSize = (limit ?? 20);
            int pageNumber = (page ?? 1);

            var filteredUsers = uw.UserRepositoty.Get(filterExpression);
            int total = filteredUsers.Count();
            var res = filteredUsers
                .Select(u => u.ToViewModel(uw.UserManager.GetRoles(u.Id)))
                .ToPagedList(pageNumber, pageSize);

            return Json(new UsersListViewModel() { Success = true, ResponseText = "OK", Total = total, Users = res }, JsonRequestBehavior.AllowGet);
        }


        // POST: /Manage/Create
        [HttpPost]
        public async Task<JsonResult> Create(UserViewModel account)
        {
            if (account == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad request" });
            }

            if (uw.UserManager.FindByEmail(account.Email) != null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "User already exists" });
            }

            var newuser = account.ToModel();
            var result = await uw.UserManager.CreateAsync(newuser, account.Password);

            if (!result.Succeeded)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Cannot create User" });
            }
            /*
            try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Failed to create User: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
            }*/

            if (account.Roles != null)
            {
                foreach (var role in account.Roles)
                {
                    if (uw.RoleManager.Roles.Any(r => r.Name == role.Name))
                    {
                        await uw.UserManager.AddToRoleAsync(newuser.Id, role.Name);
                    }
                }

                /*try
                {
                    uw.Save();
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 500;
                    return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Failed to add User to roles: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
                }*/
            }

            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" });
        }

        // GET: Manage/Details
        public JsonResult Details(string id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }
            ApplicationUser user = uw.UserRepositoty.GetById(id);
            if (user == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new UserDetailsViewModel() { Success = true, ResponseText = "OK", User = user.ToViewModel(uw.UserManager.GetRoles(user.Id)) }, JsonRequestBehavior.AllowGet);
        }

        // GET: Manage/Delete
        public JsonResult Delete(string id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }
            ApplicationUser user = uw.UserRepositoty.GetById(id);
            if (user == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }

            var result = uw.UserManager.Delete(user);

            if (!result.Succeeded)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Cannot delete User" });
            }

            /*try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Failed to delete User to roles: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
            }*/

            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" });
        }
    }
}