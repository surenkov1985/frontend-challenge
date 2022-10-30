import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteCat } from "../../stores/dataReducer";
import { CatCard } from "../CatCard";

export const FavoriteCats = () => {
	const favoriteCats = useSelector((state) => state.data.favoriteCats);
	const dispatch = useDispatch();

	const likeCatHandler = (e, cat) => {
		dispatch(deleteFavoriteCat(cat));
	};

	return (
		<div className="container content__container">
			{favoriteCats &&
				favoriteCats.map((cat) => {
					return (
						<CatCard obj={cat} changeHandler={likeCatHandler} />
					);
				})}
		</div>
	);
};
