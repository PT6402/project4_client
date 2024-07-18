import { MyBookCard, OrderCard } from "../../components";

export default function MyBook() {
  const products = [
    {
      bookId: 1,
      nameBook: "book 1",
      authors: [],
      price: 1000,
      image: "https://picsum.photos/seed/VDb7zyov2/640/480",
    },
    {
      bookId: 1,
      nameBook: "book 1",
      authors: [],
      price: 1000,
      image: "https://picsum.photos/seed/VDb7zyov2/640/480",
    },
  ];
  return (
    <div>
      {products.map((order) => (
        <MyBookCard key={order._id} order={order} />
      ))}
    </div>
  );
}
