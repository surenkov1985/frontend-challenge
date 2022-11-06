import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteCats, setFavoriteCats } from "../../stores/dataReducer";
import { CatsBlock } from "../CatsBlock";

export const FavoriteCats = () => {
	const dispatch = useDispatch();
	const { favoriteCats } = useSelector((state) => state.data);

	const likeCatHandler = (e, cat) => {
		if (e.target.checked) {
			dispatch(setFavoriteCats(cat));
		}
		if (!e.target.checked) {
			dispatch(deleteFavoriteCats(cat));
		}
	};

	return (
		<>
			<CatsBlock data={favoriteCats} changeHandler={likeCatHandler} />
		</>
	);
};
