using System.Collections.Generic;
using System;
using Proteus.Domain.Foundation;
using Linq.Specifications;
using System.Linq;

namespace Sample.Domain
{
    public interface IRepository<T> where T : IdentityPersistenceBase<T, int>
    {
        void Save(T instance);
        void Delete(T instance);
        TResult FindOne<TResult>(ISpecification<T, TResult> specification);
        IQueryable<TResult> FindAll<TResult>(ISpecification<T, TResult> specification);
        IQueryable<T> FindAll();
        void Clear();
    }
}
