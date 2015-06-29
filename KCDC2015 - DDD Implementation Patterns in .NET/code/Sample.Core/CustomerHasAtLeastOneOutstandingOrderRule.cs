using System.Linq;
using Linq.Specifications;

namespace Sample.Domain
{
    public class CustomerHasAtLeastOneOutstandingOrderRule :QuerySpecification<Customer>
    {
        public override bool IsSatisfiedBy(Customer candidate)
        {
            return candidate.OrdersNotCancelled.Count() > 0;
        }
        
    }
}