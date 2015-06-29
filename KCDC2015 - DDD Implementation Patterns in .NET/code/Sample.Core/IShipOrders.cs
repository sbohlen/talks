
namespace Sample.Domain
{
    public interface IShipOrders
    {
        ShippingResult ShipOrder(Customer customer, Order order, Destination destination);
        ShippingResult CancelShipping(Order order);
    }
}
