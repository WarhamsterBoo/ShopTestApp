using System.Web.Mvc;

namespace ShopTestApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return Redirect("./app/index.html");
        }
    }
}