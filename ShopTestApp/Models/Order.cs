using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopTestApp.Models.DataAnnotations;

namespace ShopTestApp.Models
{
    public static class OrderStatus
    {
        public static readonly String New = "Новый";
        public static readonly String InProgress = "Выполняется";
        public static readonly String Completed = "Выполнен";
    }

    public class Order
    {
        public Guid ID { get; set; }

        [Required, ForeignKey("Customer")]
        public Guid Customer_ID { get; set; }
        public virtual Customer Customer { get; set; }

        public DateTime Order_Date { get; set; }
        public DateTime? Shipment_Date { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Order_Number { get; set; }

        [OrderStatus(ErrorMessage = "{0} field validation failed.")]
        public string Status { get; set; }

        public virtual ICollection<ProductInOrder> ProductInOrder { get; set; }
    }
}