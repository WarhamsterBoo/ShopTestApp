using System;
using System.Linq;
using System.Web.Mvc;
using ShopTestApp.DAL;
using ShopTestApp.Models;
using ShopTestApp.Models.ViewModels;
using PagedList;
using System.Linq.Expressions;

namespace ShopTestApp.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private UnitOfWork uw = new UnitOfWork();

        // GET: Products
        public JsonResult Index(int? page, int? start, int? limit, string filter)
        {
            Expression<Func<Product, bool>> filterExpression = FilterBuilder.Build<Product>(filter);

            int pageSize = (limit ?? 20);
            int pageNumber = (page ?? 1);

            var filteredProducts = uw.ProductRepositoty.Get(filterExpression);

            int total = filteredProducts.Count();
            var res = filteredProducts
                .Select(p => p.ToViewModel())
                .ToPagedList(pageNumber, pageSize);

            return Json(new ProductList() { Success = true, ResponseText = "OK", Total = total, Products = res }, JsonRequestBehavior.AllowGet);
        }

        // POST: Product/Create
        [HttpPost]
        [Authorize(Roles = "admin, manager")]
        public JsonResult Create(ProductViewModel product)
        {
            if (!ModelState.IsValid)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad request" }, JsonRequestBehavior.AllowGet);
            }

            var productToCreate = product.ToModel();
            uw.ProductRepositoty.Insert(productToCreate);

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

        // GET: Product/Details
        public JsonResult Details(Guid? id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request"}, JsonRequestBehavior.AllowGet);
            }
            ProductViewModel product = uw.ProductRepositoty.GetById(id).ToViewModel();
            if (product == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }
            
            return Json(new ProductDetailsViewModel() { Success = true, ResponseText = "OK", Product = product }, JsonRequestBehavior.AllowGet);
        }

        // POST: Products/Edit
        [HttpPost]
        [Authorize(Roles = "admin, manager")]
        public JsonResult Edit(ProductViewModel product)
        {
            if (!ModelState.IsValid)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Model Is Invalid" }, JsonRequestBehavior.AllowGet);
            }

            Product productToUpdate = uw.ProductRepositoty.GetById(product.ID);

            if (productToUpdate == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }

            productToUpdate.UpdateFromModel(product);
            uw.ProductRepositoty.Update(productToUpdate);

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

        // GET: Products/Delete
        [Authorize(Roles = "admin, manager")]
        public JsonResult Delete(Guid? id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }
            Product product = uw.ProductRepositoty.GetById(id);
            if (product == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }
            uw.ProductRepositoty.Delete(id);
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
