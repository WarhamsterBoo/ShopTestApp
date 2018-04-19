using Newtonsoft.Json;
using ShopTestApp.Models.ViewModels;
using System;
using System.IO;
using System.Web;
using System.Web.Mvc;


namespace ShopTestApp.Models.ModelBinding
{
    public class ShopTestAppBinder<T> : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            Stream req = controllerContext.HttpContext.Request.InputStream;
            req.Seek(0, SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();

            T input = default(T);
            try
            {
                input = JsonConvert.DeserializeObject<T>(json);
            }
            catch (Exception ex)
            {
                input = default(T);
            }
            return input;
        }

    }

    public class ShopTestAppModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(Type modelType)
        {
            if (modelType.Name == "CreateOrderViewModel")
            {
                return new ShopTestAppBinder<CreateOrderViewModel>();
            }
            return null;
        }
    }
}