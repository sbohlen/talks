using System.Collections.Generic;
using System.Linq;
using System;
using Proteus.Domain.Foundation;

namespace Sample.Domain
{
    public class Name : ValueObjectBase<Name>
    {
        private readonly string _firstname;

        private readonly string _lastname;
        private readonly CustomerNameChangeRule _customerNameChangeRule;

        /// <summary>
        /// Initializes a new instance of the Name class.
        /// </summary>
        /// <param name="firstname"></param>
        /// <param name="lastname"></param>
        public Name(string firstname, string lastname)
        {
            _firstname = firstname;
            _lastname = lastname;
            _customerNameChangeRule = new CustomerNameChangeRule();
        }

        public string Firstname
        {
            get { return _firstname; }
        }

        public string Lastname
        {
            get { return _lastname; }
        }

        public Name ChangeName(string newFirstname, string newLastname)
        {
            var proposedName = new Name(newFirstname, newLastname);
            
            if (_customerNameChangeRule.IsSatisfiedBy(proposedName))
            {
                return proposedName;
            }
            else
            {
                throw new NameChangeFailure("Cannot change name!") { AttemptedName = proposedName };
            }

        }

    }
}
