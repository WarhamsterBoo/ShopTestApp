using PagedList;
using System;
using System.ComponentModel.DataAnnotations;

namespace ShopTestApp.Models.ViewModels
{
    public class CustomerViewModel
    {
        public Guid? ID { get; set; }
        [Required, RegularExpression(@"^[0-9]{4}-[0-9]{4}$")]
        public string Code { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public Decimal Discount { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }

    public class CreateCustomerViewModel
    {
        [Required, RegularExpression(@"^[0-9]{4}-[0-9]{4}$")]
        public string Code { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public Decimal Discount { get; set; }
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        [Required]
        public string Password { get; set; }
    }

    public class CustomerDetailsViewModel : ResponseViewModel
    {
        [Required]
        public CustomerViewModel Customer { get; set; }
    }

    public class CustomerList : ResponseViewModel
    {
        public int Total { get; set; }
        public IPagedList<CustomerViewModel> Customers { get; set; }
    }
}
