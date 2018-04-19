using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using ShopTestApp.DAL;
using ShopTestApp.Models;
using PagedList;
using System.Web.Script.Serialization;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using ShopTestApp.Models.ViewModels;
using Newtonsoft.Json;

namespace ShopTestApp.Controllers
{
    public class OrderController : Controller
    {
        private UnitOfWork uw = new UnitOfWork();

        // GET: Order
        public async Task<JsonResult> Index(int? page, int? start, int? limit, string filter)
        {
            Expression<Func<Order, bool>> filterExpression = FilterBuilder.Build<Order>(filter);

            int pageSize = (limit ?? 20);
            int pageNumber = (page ?? 1);

            var filteredOrders = uw.OrderRepositoty.Get(filterExpression);

            var user = await uw.UserManager.FindByNameAsync(User.Identity.Name);
            
            if (await uw.UserManager.IsInRoleAsync(user.Id, "customer") && !await uw.UserManager.IsInRoleAsync(user.Id, "admin") && !await uw.UserManager.IsInRoleAsync(user.Id, "manager"))
            {
                Guid? currentUserId = user.Customer_Id;
                if (currentUserId == null)
                {
                    return Json(new ResponseViewModel() { Success = false, ResponseText = "Your account invalid." }, JsonRequestBehavior.AllowGet);
                }
                filteredOrders = filteredOrders.Where(o => o.Customer_ID == currentUserId);
            }

            int total = filteredOrders.Count();
            var res = filteredOrders
                .Select(o => o.ToViewModel())
                .ToPagedList(pageNumber, pageSize);

            return Json(new OrderList() { Success = true, ResponseText = "OK", Total = total, Orders = res }, JsonRequestBehavior.AllowGet);
        }

        // POST: basket/Create
        [HttpPost]
        [Authorize(Roles = "admin, customer")]
        public async Task<JsonResult> Create(CreateOrderViewModel basket)
        {
            if (!ModelState.IsValid)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }

            var user = await uw.UserManager.FindByNameAsync(User.Identity.Name);
            Guid? currentUserId = user.Customer_Id;

            if (currentUserId == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Cannot create Order without Customer" }, JsonRequestBehavior.AllowGet);
            }

            var newOrderId = Guid.NewGuid();

            var orderToCreate = new Order()
            {
                ID = newOrderId,
                Order_Date = DateTime.Now,
                Status = OrderStatus.New,
                Customer = uw.CustomerRepositoty.GetById(currentUserId)
            };

            var productsInOrder = new List<ProductInOrder>();

            foreach (var p in basket.Products)
            {
                ProductInOrder existingProduct = productsInOrder.FirstOrDefault(pio => pio.Item_Id == p.Item_ID);
                if (existingProduct!=null)
                {
                    existingProduct.Items_Count = existingProduct.Items_Count + p.Items_Count;
                }
                else
                {
                    productsInOrder.Add(new ProductInOrder()
                    {
                        ID = Guid.NewGuid(),
                        Order = uw.OrderRepositoty.GetById(newOrderId),
                        Item = uw.ProductRepositoty.GetById(p.Item_ID),
                        Items_Count = p.Items_Count,
                        Item_Price = uw.ProductRepositoty.GetById(p.Item_ID).Price
                    });
                }
            }

            orderToCreate.ProductInOrder = productsInOrder;
            uw.OrderRepositoty.Insert(orderToCreate);

            try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Error while saving: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
            }

            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" }, JsonRequestBehavior.AllowGet);
        }

        // GET: Order/Details
        public JsonResult Details(Guid? id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }
            Order order = uw.OrderRepositoty.GetById(id);
            if (order == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }
            OrderViewModel orderViewModel = order.ToViewModel();
            List<ProductsInOrderViewModel> productsInOrderViewModels = new List<ProductsInOrderViewModel>();
            foreach (var po in order.ProductInOrder)
            {
                productsInOrderViewModels.Add(po.ToViewModel());
            }
            orderViewModel.ProductsInOrder = productsInOrderViewModels;

            return Json(new OrderDetailsViewModel() { Success = true, ResponseText = "OK", Order = orderViewModel }, JsonRequestBehavior.AllowGet);
        }

        //Get: Order/Confirm
        [Authorize(Roles = "admin, manager")]
        public JsonResult Confirm (Guid id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }
            Order order = uw.OrderRepositoty.GetById(id);
            if (order == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }
            order.Shipment_Date = DateTime.Now;
            order.Status = OrderStatus.InProgress;
            uw.OrderRepositoty.Update(order);
            try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Error while saving: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" }, JsonRequestBehavior.AllowGet);
        }

        //Get: Order/Close
        [Authorize(Roles = "admin, manager")]
        public JsonResult Close (Guid id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }
            Order order = uw.OrderRepositoty.GetById(id);
            if (order == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }
            order.Status = OrderStatus.Completed;
            uw.OrderRepositoty.Update(order);
            try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Error while saving: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new ResponseViewModel() { Success = true, ResponseText = "OK" }, JsonRequestBehavior.AllowGet);
        }

        //Get: Order/Delete
        [Authorize(Roles = "admin, customer")]
        public JsonResult Delete(Guid id)
        {
            if (id == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Bad Request" }, JsonRequestBehavior.AllowGet);
            }
            Order order = uw.OrderRepositoty.GetById(id);
            if (order == null)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = "Not Found" }, JsonRequestBehavior.AllowGet);
            }
            if (order.Status == OrderStatus.InProgress)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Cannot delete order in {0} state", OrderStatus.InProgress) }, JsonRequestBehavior.AllowGet);
            }

            uw.OrderRepositoty.Delete(order);

            try
            {
                uw.Save();
            }
            catch (Exception ex)
            {
                return Json(new ResponseViewModel() { Success = false, ResponseText = String.Format("Error while saving: {0}", ex.Message) }, JsonRequestBehavior.AllowGet);
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
