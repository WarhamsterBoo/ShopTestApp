using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace ShopTestApp.DAL
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> Get(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");
        T GetById(object id);
        void Insert(T item);
        void Update(T item);
        void Delete(object id);
        void Delete(T entityToDelete);
    }
}