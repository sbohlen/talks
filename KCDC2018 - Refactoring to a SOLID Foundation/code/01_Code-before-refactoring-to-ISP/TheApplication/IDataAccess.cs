using System.Collections.Generic;

namespace Demo.SOLID
{
    public interface IDataAccess
    {
        void GetData();
        IEnumerable<DataItem> DoQuery(string criteria);
        void SaveData(IEnumerable<DataItem> data);
        void DeleteData(IEnumerable<DataItem> data);
    }
}