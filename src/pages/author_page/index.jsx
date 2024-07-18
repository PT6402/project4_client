import { AuthorBookCard, CartCard } from "../../components";

export default function AuthorPage() {
  return (
    <div className=" mx-auto px-8 relative top-24 mb-24">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 ">
        <div className="col-span-4 sm:col-span-3 ">
          <div className="bg-gray-700 shadow rounded-lg p-6 sticky top-24">
            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/men/94.jpg"
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
              ></img>
              <h1 className="text-xl font-bold text-white">John Doe</h1>
              <p className="text-gray-200">Software Developer</p>
            </div>
            {/* <hr className="my-6 border-t border-gray-300" />
            <div className="flex flex-col">
              <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                Skills
              </span>
              <ul>
                <li className="mb-2">JavaScript</li>
                <li className="mb-2">React</li>
                <li className="mb-2">Node.js</li>
                <li className="mb-2">HTML/CSS</li>
                <li className="mb-2">Tailwind Css</li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="col-span-4 sm:col-span-9">
          <div className="bg-gray-700 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-100">
              About Author
            </h2>
            <p className="text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              finibus est vitae tortor ullamcorper, ut vestibulum velit
              convallis. Aenean posuere risus non velit egestas suscipit. Nunc
              finibus vel ante id euismod. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
              erat volutpat. Nulla vulputate pharetra tellus, in luctus risus
              rhoncus id.
            </p>

            <h2 className="text-xl font-bold  text-gray-100 mt-6 mb-4">Book</h2>
            {/* <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">Web Developer</span>
                <p>
                  <span className="text-gray-700 mr-2">at ABC Company</span>
                  <span className="text-gray-700">2017 - 2019</span>
                </p>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit.
              </p>
            </div> */}
            <div className="mb-6">
              <div className="rounded-lg md:w-2/3">
                <AuthorBookCard
                  product={{
                    bookId: 1,
                    image: "https://picsum.photos/seed/VDb7zyov2/640/480",
                    price: 10,
                    nameBook: "test",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
