import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteCat, setCatsData, setFavoriteCats, setFirstRender } from "../../stores/dataReducer";
import { useInView } from "react-intersection-observer";
import { CatCard } from "../CatCard";

export const AllCats = () => {
	const dispatch = useDispatch();

	const { catsData, favoriteCats, firstRender } = useSelector((state) => state.data);
	const [isLoad, setIsLoad] = useState(false);
	const [page, setPage] = useState(0);
	const [moreText, setMoreText] = useState("");
	const [error, setError] = useState("");
	let limit = 20;
	const apiKey = "live_wgTVl4q73CIJTgweqoNx741qVwh7OXb3haDqoKRm8y1Bw2oi3YREmLHTxZaCVj9X";

	const { ref, inView } = useInView({
		rootMargin: "200px 0px 0px",
	});

	function setLikesCatsCard(arr, likesArr) {
		let data = [];
		if (likesArr.length) {
			likesArr.forEach((element) => {
				data = arr.map((item) => {
					if (item.id === element.id) {
						return { ...item, like: true };
					} else if (item.id !== element.id) {
						return { ...item, like: false };
					}
				});
			});
		} else {
			data = arr.map((item) => {
				return { ...item, like: false };
			});
		}

		return data;
	}

	useEffect(() => {
		if (!catsData.length) {
			getData();
		}
	}, []);

	useEffect(() => {
		if (inView && firstRender) {
			getData();
		}
	}, [inView]);

	useEffect(() => {
		localStorage.setItem("favoriteCats", JSON.stringify(favoriteCats));
	}, [favoriteCats]);

	function getData() {
		setIsLoad(true);
		fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}page&api_key=${apiKey}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				dispatch(setCatsData(setLikesCatsCard(data, favoriteCats)));
				setPage(page + 1);
				setIsLoad(false);
				dispatch(setFirstRender());
				setMoreText("ещё ");
			})
			.catch((err) => {
				setError("Сервер не отвечает");
				setTimeout(() => {
					setError("");
				}, 1500);
				setIsLoad(false);
			});
	}

	const likeCatHandler = (e, cat) => {
		if (e.target.checked) {
			if (!favoriteCats.find((item) => item.id === cat.id)) {
				dispatch(setFavoriteCats(cat));
			}
		}
		if (!e.target.checked) {
			dispatch(deleteFavoriteCat(cat));
		}
	};

	return (
		<>
			<div className="container content__container">
				{catsData.map((cat) => {
					return <CatCard obj={cat} key={cat.id} changeHandler={likeCatHandler} />;
				})}
				<div ref={ref} />
			</div>

			{isLoad && <div className="content__onload container">... загружаем {moreText}котиков ...</div>}
			{error && <div className="content__error">{error}</div>}
		</>
	);
};
