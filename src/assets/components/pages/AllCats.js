import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteCats, getCats, setError, setFavoriteCats } from "../../stores/dataReducer";
import { useInView } from "react-intersection-observer";
import { CatsBlock } from "../CatsBlock";
import { options } from "../utils/urlUtils";

export const AllCats = () => {
	const dispatch = useDispatch();
	const { catsData, error, isLoading, moreText, allPages, pageAll } = useSelector((state) => state.data);
	const { ref, inView } = useInView({
		rootMargin: "200px 0px 0px",
	});

	useEffect(() => {
		if (!catsData.length) {
			dispatch(getCats(options));
		}
	}, []);

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				dispatch(setError(null));
			}, 1500);
		}
	}, [error]);

	useEffect(() => {
		if (inView && pageAll < allPages && !isLoading) {
			dispatch(getCats(options));
		}
	}, [inView]);

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
			<CatsBlock data={catsData} changeHandler={likeCatHandler} refVal={ref} />

			{isLoading && <div className="content__onload">... загружаем {moreText}котиков ...</div>}
			{error && <div className="content__error">{error}</div>}
		</>
	);
};
