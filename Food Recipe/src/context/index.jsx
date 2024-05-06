import { useState } from "react";
import PropTypes from "prop-types";
import { createContext } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setReceipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favouriteList, setFavouriteList] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await response.json();
      if (data?.data?.recipes) {
        setReceipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
      }
      // console.log(data);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFav(getCurrentItem) {
    console.log(getCurrentItem);
    let cpyFavouriteList = [...favouriteList];
    const index = cpyFavouriteList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      cpyFavouriteList.push(getCurrentItem);
    } else {
      cpyFavouriteList.splice(index, 1);
    }
    setFavouriteList(cpyFavouriteList);
  }
  console.log(favouriteList, "favouriteList");
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetails,
        setRecipeDetails,
        handleAddToFav,
        favouriteList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};
