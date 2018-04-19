using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShopTestApp.Models
{
    public class Customer
    {
        public Guid ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required, RegularExpression(@"^[0-9]{4}-[0-9]{4}$")]
        public string Code { get; set; }
        public string Address { get; set; }
        public Decimal Discount { get; set; }
    }
}