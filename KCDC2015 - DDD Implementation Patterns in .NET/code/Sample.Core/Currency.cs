using System;
using System.Runtime.InteropServices;
using Proteus.Domain.Foundation;

namespace Sample.Domain
{
    public class Currency : ValueObjectBase<Currency>
    {
        public double Value { get; private set; }

        public Currency(double value)
        {
            Value = value;
        }

        public static Currency operator +(Currency left, Currency right)
        {
            return new Currency(left.Value + right.Value);
        }

        public static Currency operator -(Currency left, Currency right)
        {
            return new Currency(left.Value - right.Value);
        }

        public static Currency operator *(Currency left, Currency right)
        {
            return new Currency(left.Value * right.Value);
        }

        public static Currency operator /(Currency left, Currency right)
        {
            return new Currency(left.Value / right.Value);
        }

        public Currency IncreaseBy(double amount)
        {
            if (amount < 0)
            {
                throw new ArgumentException("Value must be >= 0; to decrease by fixed amount use .DecreaseBy(...) method.", "amount");
            }

            return new Currency(Value + amount);
        }

        public Currency DecreaseBy(double amount)
        {
            return new Currency(Value - amount);
        }



    }
}