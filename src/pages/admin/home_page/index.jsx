import useStatistics from "../../../hooks/admin/useStatistics";
import StatTile from "./StatTile";
import BookStatisticsChart from "../statistics_page/BookStatisticsChart";

export default function AdminHomePage() {
  const { statistics, isLoading, error } = useStatistics();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calculate total revenue, books sold, etc.
  const totalRevenue = statistics.reduce((sum, stat) => sum + stat.sales, 0).toFixed(2);
  const booksSold = statistics.reduce((sum, stat) => sum + stat.boughtBooks, 0);
  const booksRented = statistics.reduce((sum, stat) => sum + stat.rentedBooks, 0);

  // Calculate most and least purchased books
  const mostPurchasedBook = statistics.reduce((max, stat) => stat.boughtBooks > max.boughtBooks ? stat : max, statistics[0]);
  const leastPurchasedBook = statistics.reduce((min, stat) => stat.boughtBooks < min.boughtBooks ? stat : min, statistics[0]);

  return (
    <>
      <div className="grid grid-cols-1 mt-8 md:grid-cols-4 gap-6">
        <StatTile title="Total Income" value={`$${totalRevenue}`} icon="💰" />
        <StatTile title="Books Sold" value={booksSold} icon="📚" />
        <StatTile title="Books Rented" value={booksRented} icon="📖" />
        <StatTile title="Most Purchased Book" value={mostPurchasedBook.bookName} icon="🏆" />
        <StatTile title="Least Purchased Book" value={leastPurchasedBook.bookName} icon="📉" />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Monthly Sales</h3>
        <BookStatisticsChart statistics={statistics} />
      </div>
    </>
  );
}
