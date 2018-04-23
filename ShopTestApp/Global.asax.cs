using ShopTestApp.Models.ModelBinding;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ShopTestApp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ModelBinderProviders.BinderProviders.Insert(0, new ShopTestAppModelBinderProvider());
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
