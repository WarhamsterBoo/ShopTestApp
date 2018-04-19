using PagedList;
using System;
using System.ComponentModel.DataAnnotations;

namespace ShopTestApp.Models.ViewModels
{

    public class ProductViewModel
    {
        //Questionable
        public Guid? ID { get; set; }
        [Required, RegularExpression(@"^[0-9]{2}-[0-9]{4}-[A-Z]{2}[0-9]{2}$")]
        public string Code { get; set; }
        public string Name { get; set; }
        public Decimal Price { get; set; }
        [StringLength(30)]
        public string Category { get; set; }
    }

    public class ProductDetailsViewModel : ResponseViewModel
    {
        [Required]
        public ProductViewModel Product { get; set; }
    }

    public class ProductList : ResponseViewModel
    {
        public int Total { get; set; }
        public IPagedList<ProductViewModel> Products { get; set; }
    }
}
