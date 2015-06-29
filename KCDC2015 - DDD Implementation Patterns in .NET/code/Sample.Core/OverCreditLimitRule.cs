using Linq.Specifications;

namespace Sample.Domain
{
    public class OverCreditLimitRule :QuerySpecification<Customer>
    {
        private readonly ICheckCustomerCredit _creditChecker;

        public OverCreditLimitRule(ICheckCustomerCredit creditChecker)
        {
            _creditChecker = creditChecker;
        }

        public override bool IsSatisfiedBy(Customer candidate)
        {
            return !_creditChecker.IsWithinCreditLimit(candidate);
        }
    }
}