import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { AllCats } from "./pages/AllCats";
import { FavoriteCats } from "./pages/FavoriteCats";

export const App = () => {
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	navigate("all");
	// }, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="all" element={<AllCats />} />
					<Route path="favorite" element={<FavoriteCats />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
