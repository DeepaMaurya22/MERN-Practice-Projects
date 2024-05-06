import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);
  return (
    <nav className="flex justify-between items-center py-8 container mx-auto  lg:flex ">
      <h1 className="text-2xl font-semibold">FoodRecipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Enter Items.."
          className="bg-white/75 p-3 px-8 outline-none rounded-full lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favourite"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Favourite
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
