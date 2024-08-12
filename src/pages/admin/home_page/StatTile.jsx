// export default function StatTile({ title, value, icon }) {
//     return (
//         <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-green-500 p-6 shadow-lg rounded-lg transform transition-transform hover:scale-105">
//             <div className="text-4xl text-white mb-2">{icon}</div>
//             <h3 className="text-lg font-semibold text-white">{title}</h3>
//             <p className="text-3xl font-bold text-white mt-1">{value}</p>
//         </div>
//     );
// }

export default function StatTile({ title, value, icon }) {
    return (
        <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-green-500 p-6 shadow-lg rounded-lg transform transition-transform hover:scale-105">
            <div className="text-4xl text-white mb-2">{icon}</div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
    );
}
