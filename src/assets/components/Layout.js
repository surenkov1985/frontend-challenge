import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export const Layout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	console.log(location);
	useEffect(() => {
		navigate("" + location.pathname === "/" ? "all" : location.pathname.replace("/", ""));
	}, []);

	return (
		<>
			<header className="header">
				<div className="container">
					<NavLink className="header__link" to="all">
						Все котики
					</NavLink>
					<NavLink className="header__link" to="favorite">
						Любимые котики
					</NavLink>
				</div>
			</header>
			<main className="content">
				<Outlet />
			</main>
		</>
	);
};
