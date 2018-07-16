using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Demo.SOLID
{
    public class Report
    {
        private void GetData()
        {
            Console.WriteLine("\nGetting Data from database...");
        }

        private void FormatReport()
        {
            Console.WriteLine("\nFormatting Report for 8-1/2x11...");
        }

        public void Print()
        {
            GetData();
            FormatReport();
            Console.WriteLine("\nPrinting Report to Laser Printer...");
        }
    }
}
