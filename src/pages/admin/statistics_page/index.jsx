import useStatistics from "../../../hooks/admin/useStatistics";
// import BookStatisticsChart from './BookStatisticsChart';

const StatisticsPage = () => {
  const { statistics, isLoading, error } = useStatistics();

  console.log(statistics);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Book Statistics</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="table-fixed bg-white">
            <thead>
              <tr>
                <th className="py-2 px-8 border-b">Book Name</th>
                <th className="py-2 px-8 border-b">Total Books</th>
                <th className="py-2 px-8 border-b">Bought Books</th>
                <th className="py-2 px-8 border-b">Rented Books</th>
                <th className="py-2 px-8 border-b">Sales</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat) => (
                <tr key={stat.bookId}>
                  <td className="py-2 px-8 border-b">{stat.bookName}</td>
                  <td className="py-2 px-8 border-b">{stat.totalBooks}</td>
                  <td className="py-2 px-8 border-b">{stat.boughtBooks}</td>
                  <td className="py-2 px-8 border-b">{stat.rentedBooks}</td>
                  <td className="py-2 px-8 border-b">${stat.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        // <BookStatisticsChart statistics={statistics} />
      )}
    </div>
  );
};

export default StatisticsPage;
