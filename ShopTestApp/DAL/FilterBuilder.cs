using ShopTestApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Web.Script.Serialization;

namespace ShopTestApp.DAL
{
    //Обеспечивает универсальное построение выражений для фильтрации коллекций объектов
    public static class FilterBuilder
    {
        private static MethodInfo containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) });

        public static Expression<Func<T, bool>> Build <T> (string filterString)
        {
            Expression<Func<T, bool>> lambda1 = null;

            if (!String.IsNullOrEmpty(filterString))
            {
                Expression exp = null;
                JavaScriptSerializer js = new JavaScriptSerializer();
                var filters = js.Deserialize<List<StoreFilter>>(filterString);
                ParameterExpression param = Expression.Parameter(typeof(T), "pram");

                foreach (var filter in filters)
                {
                    var propertyToFilter = typeof(T).GetProperty(filter.Property);
                    if (propertyToFilter == null)
                    {
                        continue;
                    }

                    MemberExpression member = Expression.Property(param, filter.Property);
                    ConstantExpression constant = null;
                    
                    if (propertyToFilter.PropertyType == typeof(Decimal))
                    {
                        if (Decimal.TryParse(filter.Value, out Decimal decimalValue))
                        {
                            constant = Expression.Constant(decimalValue);
                        }
                    }
                    else if (propertyToFilter.PropertyType == typeof(Int32))
                    {
                        if (Int32.TryParse(filter.Value, out int intValue))
                        {
                            constant = Expression.Constant(intValue);
                        }
                    }
                    else
                    {
                        constant = Expression.Constant(filter.Value);
                    }

                    if (exp == null)
                    {
                        if (member.Type != typeof(String))
                        {
                            exp = Expression.Equal(member, constant);
                        }
                        else
                        {
                            exp = Expression.Call(member, containsMethod, constant);
                        }
                    }
                    else
                    {
                        if (member.Type != typeof(String))
                        {
                            exp = Expression.AndAlso(exp, Expression.Equal(member, constant));
                        }
                        else
                        {
                            exp = Expression.AndAlso(exp, Expression.Call(member, containsMethod, constant));
                        }
                    }
                }

                if (exp != null)
                {
                    lambda1 = Expression.Lambda<Func<T, bool>>(exp, param);
                }
            }
            return lambda1;
        }
    }
}