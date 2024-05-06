import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const { recipeDetails, setRecipeDetails, handleAddToFav, favouriteList } =
    useContext(GlobalContext);
  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data?.data?.recipe) {
        setRecipeDetails(data?.data?.recipe);
      }
    }
    getRecipeDetails();
  }, []);
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden roundexl group">
          <img
            src={recipeDetails?.image_url}
            alt="recipe ingredients"
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetails?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetails?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFav(recipeDetails)}
            className="p-3 px-5 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {favouriteList &&
            favouriteList.length > 0 &&
            favouriteList.findIndex((item) => item.id === recipeDetails?.id) !==
              -1
              ? "Remove from favourite"
              : "Add as favourite"}
          </button>
          <div className="mt-5">
            <span className="text-2xl b font-semibold text-black">
              Ingredients:
            </span>
            <ul className="flex  font-semibold flex-col gap-3 mt-5">
              {recipeDetails?.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span className="text-xl font-semibold flex-col gap-3">
                    {ingredient.quantity}
                    {"  "}
                    {ingredient.unit} {"  "}
                  </span>
                  <span className="text-xl text-black">
                    {ingredient.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
