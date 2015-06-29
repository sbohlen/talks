using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Linq.Specifications;

namespace Sample.Domain
{
    public class AirShippingApprovalRule:QuerySpecification<Customer>
    {
        private readonly Address _destination;

        private readonly IEnumerable<State> _restrictedStates;

        public AirShippingApprovalRule(Address destination)
        {
            _destination = destination;

            _restrictedStates = new List<State>
                {
                    new State("New York", "NY" ),
                    new State("New Jersey", "NJ" ),
                    new State("Connecticut", "CT" ),
                    new State("Pennsylvania", "PA" )
                };
        }

        public override bool IsSatisfiedBy(Customer candidate)
        {
            return !_restrictedStates.Contains(candidate.Address.State);
        }
        
    }
}