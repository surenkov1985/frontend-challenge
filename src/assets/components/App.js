import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { AllCats } from "./pages/AllCats";
import { FavoriteCats } from "./pages/FavoriteCats";

export const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="all" element={<AllCats />} />
					<Route path="favorite" element={<FavoriteCats />} />
				</Route>
			</Routes>
		</HashRouter>
	);
};
