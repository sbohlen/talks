using Sample.Domain;

namespace Sample.Infrastructure
{
    public class AccountingSystemCustomerCreditChecker : ICheckCustomerCredit
    {
        public bool IsWithinCreditLimit(Customer customer)
        {
            //TODO: contact back-end system for actual response
            return true;
        }

        public bool IsWithinCreditLimitByMargin(Customer customer, Currency margin)
        {
            //TODO: contact back-end system for actual response
            return true;
        }

        public Currency RemainingCredit(Customer customer)
        {
            //TODO: contact back-end system for actual response
            return new Currency(200.0);
        }

        public bool NewOrderWouldExceedCreditLimit(Customer customer, Order order)
        {
            //TODO: contact back-end system for actual response
            return false;
        }
    }
}