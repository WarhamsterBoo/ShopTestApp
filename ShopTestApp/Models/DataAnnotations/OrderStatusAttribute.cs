using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace ShopTestApp.Models.DataAnnotations
{


    public class OrderStatusAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            bool result = false;
            if (String.Compare(value.ToString(), OrderStatus.New, true) == 0 ||
                String.Compare(value.ToString(), OrderStatus.InProgress, true) == 0 ||
                String.Compare(value.ToString(), OrderStatus.Completed, true) == 0)
            {
                result = true;
            }
            return result;
        }

        public override string FormatErrorMessage(string name)
        {
            return String.Format(CultureInfo.CurrentCulture,
              ErrorMessageString, name);
        }
    }
}