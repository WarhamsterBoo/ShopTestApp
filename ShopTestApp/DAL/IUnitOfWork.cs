using ShopTestApp.Models;
using System;

namespace ShopTestApp.DAL
{
    public interface IUnitOfWork
    {
        IRepository<Product> ProductRepositoty { get; }
        IRepository<Customer> CustomerRepositoty { get; }
        IRepository<Order> OrderRepositoty { get; }

        void Save();
    }
}