namespace ShopTestApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using ShopTestApp.DAL;
    using ShopTestApp.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ShopTestAppContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ShopTestAppContext context)
        {
            context.Customer.AddOrUpdate(
                  p => p.Code,
                  new Customer { ID = Guid.NewGuid(), Name = "Box Ind.", Code = "0001-2001", Discount = 10, Address = "Moscow" },
                  new Customer { ID = Guid.NewGuid(), Name = "Rock Inc.", Code = "0002-2016", Discount = 0, Address = "LA" },
                  new Customer { ID = Guid.NewGuid(), Name = "Paper", Code = "0003-2017", Discount = 1, Address = "Saint-Petersburg" },
                  new Customer { ID = Guid.NewGuid(), Name = "Admin", Code = "0004-2018", Discount = 0, Address = "Server room" },
                  new Customer { ID = Guid.NewGuid(), Name = "Customer", Code = "0005-2018", Discount = 0, Address = "Moscow" }
                );

            context.SaveChanges();

            if (!context.Roles.Any(r => r.Name == "admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "admin" };

                manager.Create(role);
            }

            context.SaveChanges();

            if (!context.Roles.Any(r => r.Name == "customer"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "customer" };

                manager.Create(role);
            }

            context.SaveChanges();

            if (!context.Roles.Any(r => r.Name == "manager"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "manager" };

                manager.Create(role);
            }

            context.SaveChanges();

            if (!context.Users.Any(u => u.UserName == "admin@sta.com"))
            {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "admin@sta.com", Email = "admin@sta.com" };

                var result = manager.Create(user, "123456");
                if (result.Succeeded)
                {
                    manager.AddToRole(user.Id, "admin");
                    manager.AddToRole(user.Id, "manager");
                    manager.AddToRole(user.Id, "customer");

                    var createdUser = manager.FindByName("admin@sta.com");
                    createdUser.Customer = context.Customer.FirstOrDefault(c => c.Name == "Admin");
                }
            }

            context.SaveChanges();

            if (!context.Users.Any(u => u.UserName == "customer@sta.com"))
            {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "customer@sta.com", Email = "customer@sta.com", Customer_Id = context.Customer.FirstOrDefault(c => c.Name == "Customer").ID };

                var result = manager.Create(user, "123456");
                if (result.Succeeded)
                {
                    manager.AddToRole(user.Id, "customer");
                }
            }

            context.SaveChanges();

            if (!context.Users.Any(u => u.UserName == "manager@sta.com"))
            {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "manager@sta.com", Email = "manager@sta.com" };

                var result = manager.Create(user, "123456");
                if (result.Succeeded)
                {
                    manager.AddToRole(user.Id, "manager");
                }
            }

            context.SaveChanges();

            context.Product.AddOrUpdate(
                  p => p.Code,
                  new Product { ID = Guid.NewGuid(), Name = "Hard Drive", Code = "44-5555-HD01", Price = 10, Category = "Hardware" },
                  new Product { ID = Guid.NewGuid(), Name = "Keyboard", Code = "77-6666-KB01", Price = 20, Category = "Hardware" },
                  new Product { ID = Guid.NewGuid(), Name = "Motherboard", Code = "99-8888-MB01", Price = 30, Category = "Hardware" },
                  new Product { ID = Guid.NewGuid(), Name = "Monitor", Code = "11-4560-MO01", Price = 40, Category = "Hardware" }
                );

            context.SaveChanges();

            Guid orderId = Guid.NewGuid();
            var order = new Order()
            {
                ID = orderId,
                Customer = context.Customer.FirstOrDefault(c => c.Code == "0001-2001"),
                Order_Date = DateTime.Now,
                Status = OrderStatus.New
            };

            var ProductInOrder = new List<ProductInOrder>()
            {
                new ProductInOrder()
                {
                    ID = Guid.NewGuid(),
                    Item = context.Product.FirstOrDefault(p => p.Name == "Hard Drive"),
                    Order = context.Order.FirstOrDefault(o => o.ID == orderId),
                    Item_Price = context.Product.FirstOrDefault(p => p.Name == "Hard Drive").Price,
                    Items_Count = 1
                },
                new ProductInOrder()
                {
                    ID = Guid.NewGuid(),
                    Item = context.Product.FirstOrDefault(p => p.Name == "Keyboard"),
                    Order = context.Order.FirstOrDefault(o => o.ID == orderId),
                    Item_Price = context.Product.FirstOrDefault(p => p.Name == "Keyboard").Price,
                    Items_Count = 2
                }
            };

            order.ProductInOrder = ProductInOrder;

            context.Order.AddOrUpdate(
                p => p.Order_Number,
                order
            );

            Guid orderId1 = Guid.NewGuid();
            var order1 = new Order()
            {
                ID = orderId1,
                Customer = context.Customer.FirstOrDefault(c => c.Code == "0005-2018"),
                Order_Date = DateTime.Now,
                Status = OrderStatus.InProgress
            };

            var ProductInOrder1 = new List<ProductInOrder>()
            {
                new ProductInOrder()
                {
                    ID = Guid.NewGuid(),
                    Item = context.Product.FirstOrDefault(p => p.Name == "Monitor"),
                    Order = context.Order.FirstOrDefault(o => o.ID == orderId1),
                    Item_Price = context.Product.FirstOrDefault(p => p.Name == "Monitor").Price,
                    Items_Count = 1
                },
                new ProductInOrder()
                {
                    ID = Guid.NewGuid(),
                    Item = context.Product.FirstOrDefault(p => p.Name == "Keyboard"),
                    Order = context.Order.FirstOrDefault(o => o.ID == orderId1),
                    Item_Price = context.Product.FirstOrDefault(p => p.Name == "Keyboard").Price,
                    Items_Count = 5
                }
            };

            order1.ProductInOrder = ProductInOrder1;

            context.Order.AddOrUpdate(
                p => p.Order_Number,
                order1
            );

            context.SaveChanges();
        }
    }
}
