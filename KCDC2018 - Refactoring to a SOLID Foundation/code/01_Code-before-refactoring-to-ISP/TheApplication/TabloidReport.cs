namespace Demo.SOLID
{
    public class TabloidReport : Report
    {
        public override void Print()
        {
            DataAccess dataAccess = new DataAccess();
            dataAccess.GetData();

            ReportFormatter reportFormatter = new TabloidReportFormatter();
            reportFormatter.FormatReport();

            ReportPrinter reportPrinter = new TabloidReportPrinter();
            reportPrinter.Print();
        }
    }
}