import React, { useEffect, useState } from "react";

export const AllCats = () => {
	const [catsData, setCatsData] = useState([]);

	function getData() {
		fetch(
			"https://api.thecatapi.com/v1/images/search?limit=15&page=0&api_key=live_wgTVl4q73CIJTgweqoNx741qVwh7OXb3haDqoKRm8y1Bw2oi3YREmLHTxZaCVj9X"
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setCatsData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	console.log(catsData);

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className="container content__container">
			{catsData.map((cat) => {
				return (
					<div className="content__img">
						<div className="content__img-container" key={cat.id}>
							<img src={cat.url} alt={cat.id} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
