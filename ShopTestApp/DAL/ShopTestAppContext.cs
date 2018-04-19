using ShopTestApp.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ShopTestApp.DAL
{
    public class ShopTestAppContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductInOrder> ProductInOrder { get; set; }

        public ShopTestAppContext()
            : base("ShopTestAppContext", throwIfV1Schema: false)
        {
        }

        public static ShopTestAppContext Create()
        {
            return new ShopTestAppContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<Order>()
                .HasMany(m => m.ProductInOrder)
                .WithRequired(m => m.Order)
                .HasForeignKey(m => m.Order_Id);
            modelBuilder.Entity<Product>()
                .HasMany(m => m.ProductInOrder)
                .WithRequired(m => m.Item)
                .HasForeignKey(m => m.Item_Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}