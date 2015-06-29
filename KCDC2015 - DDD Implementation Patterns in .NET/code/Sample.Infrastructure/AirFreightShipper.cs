using Sample.Domain;

namespace Sample.Infrastructure
{
    public class AirFreightShipper : IShipOrders
    {
        public ShippingResult ShipOrder(Customer customer, Order order, Destination destination)
        {
            //can only ship via air if not in a too-nearby state
            if (new AirShippingApprovalRule(destination).IsSatisfiedBy(customer))
                //do something here with customer, order, and destination
                return ShippingResult.Success;
            else
                return ShippingResult.Failure;
        }

        public ShippingResult CancelShipping(Order order)
        {
            order.Cancel();

            return ShippingResult.Cancelled;
        }
    }
}
