using PagedList;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Http.ModelBinding;
using ShopTestApp.Models.ModelBinding;

namespace ShopTestApp.Models.ViewModels
{
    public class OrderViewModel
    {
        public Guid? ID { get; set; }

        [Required]
        public virtual Customer Customer { get; set; }

        public DateTime Order_Date { get; set; }
        public DateTime? Shipment_Date { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Order_Number { get; set; }
        public string Status { get; set; }

        public virtual ICollection<ProductsInOrderViewModel> ProductsInOrder { get; set; }
    }

    public class ProductsInOrderViewModel
    {
        public Guid ID { get; set; }
        [Required]
        public virtual ProductViewModel Item { get; set; }
        [Required]
        public int Items_Count { get; set; }
        [Required]
        public decimal Item_Price { get; set; }
    }

    public class ProductInOrderViewModel
    {
        public Guid Item_ID { get; set; }
        public int Items_Count { get; set; }
    }

    public class CreateOrderViewModel
    {
        public IList<ProductInOrderViewModel> Products { get; set; }
    }

    public class OrderList : ResponseViewModel
    {
        public int Total { get; set; }
        public IPagedList<OrderViewModel> Orders { get; set; }
    }

    public class OrderDetailsViewModel : ResponseViewModel
    {
        [Required]
        public OrderViewModel Order { get; set; }
    }
}
