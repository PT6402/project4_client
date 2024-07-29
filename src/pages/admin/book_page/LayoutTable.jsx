/* eslint-disable react/prop-types */

export default function LayoutTable({ children }) {
  return (
    <table className="w-full my-0 align-middle text-dark border-neutral-200">
      <thead className="align-bottom">
        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
          <th className="pb-3 text-start min-w-[175px]">Name</th>
          <th className="pb-3 text-end min-w-[100px]">Authors</th>
          <th className="pb-3 text-end min-w-[100px]">Categorys</th>
          <th className="pb-3 text-end min-w-[100px]">Publisher</th>
          <th className="pb-3 pr-12 text-end min-w-[175px]">Star</th>
          <th className="pb-3 pr-12 text-end min-w-[100px]">Price</th>
          <th className="pb-3 text-end min-w-[50px]">Edit</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
