using Linq.Specifications;

namespace Sample.Domain
{
    public class GroundShippingApprovalRule:QuerySpecification<Customer>
    {
        private readonly Address _destination;


        public GroundShippingApprovalRule(Address destination)
        {
            _destination = destination;
        }

        public override bool IsSatisfiedBy(Customer candidate)
        {
            return candidate.Address == _destination;
        }
        
    }
}