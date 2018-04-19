using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopTestApp.Models
{
    public class ProductInOrder
    {
        public Guid ID { get; set; }

        [Required, ForeignKey("Order")]
        public Guid Order_Id { get; set; }
        public virtual Order Order { get; set; }

        [Required, ForeignKey("Item")]
        public Guid Item_Id { get; set; }
        public virtual Product Item { get; set; }

        [Required]
        public int Items_Count { get; set; }
        [Required]
        public decimal Item_Price { get; set; }
    }
}