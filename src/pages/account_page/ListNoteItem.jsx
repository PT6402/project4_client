export default function ListNoteItem() {
  const list = [
    { id: 1, note: "helloow1", page: 10 },
    { id: 2, note: "helloow2", page: 13 },
    { id: 3, note: "helloow3", page: 14 },
    { id: 4, note: "helloow3", page: 50 },
    { id: 5, note: "helloow3", page: 10 },
    { id: 6, note: "helloow3", page: 200 },
    { id: 7, note: "helloow3", page: 1 },
    { id: 8, note: "helloow3", page: 150 },
  ];
  return (
    <div className="flex flex-col gap-3 py-3">
      {list.map(({ id, note, page }) => (
        <div
          key={id}
          className="bg-gray-100  text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full scale-90 hover:scale-95 duration-200 cursor-pointer "
        >
          {note}
          <div className="text-gray-500 font-thin text-sm pt-1">
            <p>page-{page}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
