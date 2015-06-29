using System.Collections.Generic;
using Sample.Domain;
using System;
using System.Linq;

namespace Sample.Infrastructure
{

    public class Customers : InMemoryRepository<Customer>, ICustomerRepository
    {
        public void AddCustomer(Customer customer)
        {
            Save(customer);
        }

        public void AddCustomers(IEnumerable<Customer> customers)
        {
            foreach (Customer customer in customers)
            {
                AddCustomer(customer);
            }
        }

        public void ChangeCustomer(Customer customer)
        {
            Save(customer);
        }

        public IEnumerable<Customer> FromState(State state)
        {
            var criteria = new CustomerIsFromStateRule(state);
            return FindAll(criteria).AsEnumerable();
        }

        public IEnumerable<Customer> OverCreditLimit()
        {
            var criteria = new OverCreditLimitRule(new AccountingSystemCustomerCreditChecker());
            return FindAll(criteria).AsEnumerable();
        }

        public void RemoveCustomer(Customer customer)
        {
            Delete(customer);
        }

        public void RemoveCustomers(IEnumerable<Customer> customers)
        {
            foreach (var customer in customers)
            {
                RemoveCustomer(customer);
            }
        }

        public IEnumerable<Customer> WithOutstandingOrders()
        {
            var criteria = new CustomerHasAtLeastOneOutstandingOrderRule();
            return FindAll(criteria).AsEnumerable();
        }

    }
}