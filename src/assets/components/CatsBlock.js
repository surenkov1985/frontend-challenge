import React from "react";
import { CatCard } from "./CatCard";

export const CatsBlock = ({ data, changeHandler, refVal }) => {
	return (
		<div className="container content__container">
			{data &&
				data.map((obj) => {
					return <CatCard obj={obj} key={obj.id} changeHandler={changeHandler} />;
				})}
			{refVal && <div ref={refVal} />}
		</div>
	);
};
