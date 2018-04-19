using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShopTestApp.Models.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }

    public class UserInfoRoleViewModel
    {
        public string Name { get; set; }
    }

    public class UserInfoViewModel
    {
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Name")]
        public string Name { get; set; }

        [Display(Name = "Roles")]
        public IList<UserInfoRoleViewModel> Roles { get; set; }
    }

    public class UserInfoDetailsViewModel : ResponseViewModel
    {
        [Required]
        public UserInfoViewModel CurrentUser { get; set; }
    }
}
