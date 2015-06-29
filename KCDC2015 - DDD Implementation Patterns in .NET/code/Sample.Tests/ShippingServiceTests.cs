using NUnit.Framework;
using Sample.Domain;

namespace Sample.Infrastructure
{

    public class ShippingServiceTests
    {
        [TestFixture]
        public class When_Shipping_An_Order
        {
            [Test]
            public void ShipOrder_Can_Return_Success()
            {
                Customer customer = new Customer();

                Order order = new Order();
                Destination destination = new Destination("123", "Main Street", "Anywhere", new State("SomeState", "SS"), "12345");

                customer.ChangeAddress(destination);

                IShipOrders groundShipper = new GroundShipper();

                Assert.That(groundShipper.ShipOrder(customer, order, destination), Is.EqualTo(ShippingResult.Success));
            }

            [Test]
            public void CancelShipping_Can_Return_Cancelled()
            {
                IShipOrders groundShipper = new GroundShipper();

                Order order = new Order();
                Assert.That(groundShipper.CancelShipping(order), Is.EqualTo(ShippingResult.Cancelled));
                Assert.That(order.Status, Is.EqualTo(OrderStatus.Cancelled));
            }
        }



    }
}
