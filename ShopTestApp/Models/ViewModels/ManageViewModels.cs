using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PagedList;

namespace ShopTestApp.Models.ViewModels
{
    public class RoleViewModel
    {
        public string Name { get; set; }
    }

    public class UserViewModel
    {
        public string ID { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

        public IList<RoleViewModel> Roles { get; set; }
    }

    public class UsersListViewModel : ResponseViewModel
    {
        public int Total { get; set; }
        public IPagedList<UserViewModel> Users { get; set; }
    }

    public class UserDetailsViewModel : ResponseViewModel
    {
        public UserViewModel User { get; set; }
    }
}