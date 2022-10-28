import React, { useEffect } from "react";

function getData() {
	fetch("https://api.thecatapi.com/v1/images/search?limit=15&page=0&api_key=live_wgTVl4q73CIJTgweqoNx741qVwh7OXb3haDqoKRm8y1Bw2oi3YREmLHTxZaCVj9X")
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

export const AllCats = () => {
	useEffect(() => {
		getData();
	}, []);
	return <div className="container content__container">Cats</div>;
};
