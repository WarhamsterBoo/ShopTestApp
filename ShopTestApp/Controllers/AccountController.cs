using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Collections.Generic;
using ShopTestApp.Models.ViewModels;

namespace ShopTestApp.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager )
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        public async Task<JsonResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request." }, JsonRequestBehavior.AllowGet);
            }

            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, false, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" }, JsonRequestBehavior.AllowGet);
                case SignInStatus.LockedOut:
                    return Json(new ResponseViewModel() { Success = false, ResponseText = "Account is Locked Out" }, JsonRequestBehavior.AllowGet);
                case SignInStatus.Failure:
                default:
                    return Json(new ResponseViewModel() { Success = false, ResponseText = "Wrong Email or Password" }, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: /Account/GetCurrentUserInfo
        [HttpGet]
        public async Task<JsonResult> GetCurrentUserInfo()
        {
            var user = await UserManager.FindByNameAsync(User.Identity.Name);
            var roles = await UserManager.GetRolesAsync(user.Id);
            var rolesList = new List<UserInfoRoleViewModel>();

            roles.ToList().ForEach(r => rolesList.Add(new UserInfoRoleViewModel() { Name = r }));
            
            var userInfo = new UserInfoViewModel() {
                Name = user.UserName,
                Email = user.Email,
                Roles = rolesList
            };

            return Json(new UserInfoDetailsViewModel() { Success = true, ResponseText = "OK", CurrentUser = userInfo }, JsonRequestBehavior.AllowGet);
        }

        // POST: /Account/LogOff
        [HttpPost]
        public JsonResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" }, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}