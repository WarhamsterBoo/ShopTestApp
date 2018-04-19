using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShopTestApp.Models
{
    public class Product
    {
        public Guid ID { get; set; }
        [Required, RegularExpression(@"^[0-9]{2}-[0-9]{4}-[A-Z]{2}[0-9]{2}$")]
        public string Code { get; set; }
        public string Name { get; set; }
        public Decimal Price { get; set; }
        [StringLength(30)]
        public string Category { get; set; }

        public virtual ICollection<ProductInOrder> ProductInOrder { get; set; }
    }
}