using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ShopTestApp.Models;

namespace ShopTestApp.DAL
{
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        private ShopTestAppContext context = new ShopTestAppContext();

        private IRepository<Product> productRepository;
        private IRepository<Customer> customerRepository;
        private IRepository<Order> orderRepository;
        private IRepository<ApplicationUser> userRepository;
        private UserManager<ApplicationUser> userManager;
        private RoleManager<IdentityRole> roleManager;

        public UnitOfWork()
        {
        }

        public IRepository<Product> ProductRepositoty
        {
            get
            {
                if (this.productRepository == null)
                {
                    this.productRepository = new GenericRepository<Product>(context);
                }
                return productRepository;
            }
        }

        public IRepository<Customer> CustomerRepositoty
        {
            get
            {
                if (this.customerRepository == null)
                {
                    this.customerRepository = new GenericRepository<Customer>(context);
                }
                return customerRepository;
            }
        }

        public IRepository<Order> OrderRepositoty
        {
            get
            {
                if (this.orderRepository == null)
                {
                    this.orderRepository = new GenericRepository<Order>(context);
                }
                return orderRepository;
            }
        }

        public IRepository<ApplicationUser> UserRepositoty
        {
            get
            {
                if (this.userRepository == null)
                {
                    this.userRepository = new GenericRepository<ApplicationUser>(context);
                }
                return userRepository;
            }
        }

        public UserManager<ApplicationUser> UserManager
        {
            get
            {
                if (userManager == null)
                {
                    var store = new UserStore<ApplicationUser>(context);
                    var manager = new UserManager<ApplicationUser>(store);
                    userManager = manager;
                }
                return userManager;
            }
        }

        public RoleManager<IdentityRole> RoleManager
        {
            get
            {
                if (roleManager == null)
                {
                    var store = new RoleStore<IdentityRole>(context);
                    var manager = new RoleManager<IdentityRole>(store);
                    roleManager = manager;
                }
                return roleManager;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}