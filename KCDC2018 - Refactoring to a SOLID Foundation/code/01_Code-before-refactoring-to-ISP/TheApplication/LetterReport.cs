using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Demo.SOLID
{
    public class LetterReport : Report
    {

        public override void Print()
        {
            DataAccess dataAccess = new DataAccess();
            dataAccess.GetData();

            LetterReportFormatter reportFormatter = new LetterReportFormatter();
            reportFormatter.FormatReport();

            LetterReportPrinter reportPrinter = new LetterReportPrinter();
            reportPrinter.Print();
        }
    }
}
