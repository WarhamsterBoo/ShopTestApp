using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopTestApp.Models.ViewModels
{
    public static class ViewModelHelpers
    {
        public static ProductViewModel ToViewModel (this Product product)
        {
            var productViewModel = new ProductViewModel()
            {
                ID = product.ID,
                Name = product.Name,
                Code = product.Code,
                Category = product.Category,
                Price = product.Price
            };

            return productViewModel;
        }

        public static Product ToModel (this ProductViewModel productViewModel)
        {
            var product = new Product()
            {
                ID = productViewModel.ID == null ? Guid.NewGuid() : (Guid)productViewModel.ID,
                Name = productViewModel.Name,
                Code = productViewModel.Code,
                Category = productViewModel.Category,
                Price = productViewModel.Price
            };

            return product;
        }

        public static void UpdateFromModel (this Product product, ProductViewModel productViewModel)
        {
            product.Name = productViewModel.Name;
            product.Code = productViewModel.Code;
            product.Category = productViewModel.Category;
            product.Price = productViewModel.Price;
        }

        public static CustomerViewModel ToViewModel(this Customer customer, ApplicationUser user)
        {
            string email = null;
            if (user!=null)
            {
                email = user.Email;
            }
            var customerViewModel = new CustomerViewModel()
            {
                ID = customer.ID,
                Code = customer.Code,
                Name = customer.Name,
                Address = customer.Address,
                Discount = customer.Discount,
                Email = email
            };

            return customerViewModel;
        }

        public static Customer GetCustomerModel (this CreateCustomerViewModel createCustomerViewModel)
        {
            var customer = new Customer()
            {
                Name = createCustomerViewModel.Name,
                Code = createCustomerViewModel.Code,
                Address = createCustomerViewModel.Address,
                Discount = createCustomerViewModel.Discount
            };

            return customer;
        }

        public static Customer ToModel(this CustomerViewModel customerViewModel)
        {
            var customer = new Customer()
            {
                ID = customerViewModel.ID == null ? Guid.NewGuid() : (Guid)customerViewModel.ID,
                Name = customerViewModel.Name,
                Code = customerViewModel.Code,
                Address = customerViewModel.Address,
                Discount = customerViewModel.Discount
            };

            return customer;
        }

        public static void UpdateFromModel(this Customer customer, CustomerViewModel customerViewModel)
        {
            customer.Name = customerViewModel.Name;
            customer.Code = customerViewModel.Code;
            customer.Address = customerViewModel.Address;
            customer.Discount = customerViewModel.Discount;
        }

        public static OrderViewModel ToViewModel(this Order order)
        {
            var orderViewModel = new OrderViewModel()
            {
                ID = order.ID,
                Order_Number = order.Order_Number,
                Order_Date = order.Order_Date,
                Shipment_Date = order.Shipment_Date,
                Status = order.Status,
                Customer = order.Customer
            };

            return orderViewModel;
        }

        public static Order ToModel(this OrderViewModel orderViewModel)
        {
            var order = new Order()
            {
                ID = orderViewModel.ID == null ? Guid.NewGuid() : (Guid)orderViewModel.ID,
                Order_Number = orderViewModel.Order_Number,
                Order_Date = orderViewModel.Order_Date,
                Shipment_Date = orderViewModel.Shipment_Date,
                Status = orderViewModel.Status,
                Customer = orderViewModel.Customer
            };

            return order;
        }

        public static ProductsInOrderViewModel ToViewModel(this ProductInOrder productInOrder)
        {
            var productsInOrderViewModel = new ProductsInOrderViewModel()
            {
                ID = productInOrder.ID,
                Item = productInOrder.Item.ToViewModel(),
                Items_Count = productInOrder.Items_Count,
                Item_Price = productInOrder.Item_Price
            };

            return productsInOrderViewModel;
        }

        public static ProductInOrder ToModel(this ProductsInOrderViewModel productsInOrderViewModel)
        {
            var productInOrder = new ProductInOrder()
            {
                ID = productsInOrderViewModel.ID == null ? Guid.NewGuid() : (Guid)productsInOrderViewModel.ID,
                Item = productsInOrderViewModel.Item.ToModel(),
                Items_Count = productsInOrderViewModel.Items_Count,
                Item_Price = productsInOrderViewModel.Item_Price
            };

            return productInOrder;
        }


        public static UserViewModel ToViewModel(this ApplicationUser user, IList<string> roles)
        {
            List<RoleViewModel> rolesList = new List<RoleViewModel>();
            roles.ToList().ForEach(r => rolesList.Add(new RoleViewModel() { Name = r }));

            var userViewModel = new UserViewModel()
            {
                ID = user.Id,
                Email = user.Email,
                Roles = rolesList
            };

            return userViewModel;
        }

        public static ApplicationUser ToModel (this UserViewModel userViewModel)
        {
            ApplicationUser user = new ApplicationUser()
            {
                Email = userViewModel.Email,
                UserName = userViewModel.Email
            };
            return user;
        }
    }
}