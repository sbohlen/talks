namespace Sample.Domain
{
    public interface ICheckCustomerCredit
    {
        bool IsWithinCreditLimit(Customer customer);
        bool IsWithinCreditLimitByMargin(Customer customer, Currency margin);
        Currency RemainingCredit(Customer customer);
        bool NewOrderWouldExceedCreditLimit(Customer customer, Order order);
    }
}