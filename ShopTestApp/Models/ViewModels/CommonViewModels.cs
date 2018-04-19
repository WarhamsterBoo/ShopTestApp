using System.ComponentModel.DataAnnotations;

namespace ShopTestApp.Models.ViewModels
{
    public class ResponseViewModel
    {
        [Required]
        public bool Success { get; set; }

        [Required]
        public string ResponseText { get; set; }
    }

    public class StoreFilter
    {
        public string Property { get; set; }
        public string Value { get; set; }
    }
}
