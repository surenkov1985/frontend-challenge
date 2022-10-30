import React from "react";
import { FcLike } from "react-icons/fc";

export const CatCard = (props) => {

    const {obj, changeHandler} = props

    return (
		<div className="content__img" key={obj.id}>
			<div className="content__img-container" key={obj.id}>
				<img src={obj.url} alt={obj.id} />
				<div className="content__img-gradient">
					<label className="content__label">
						<input
							className="content__check"
							type="checkbox"
							defaultChecked={obj.like}
							onChange={(e) => {
								changeHandler(e, obj);
							}}
						/>
						<FcLike className="content__like-icon" size={40} />
					</label>
				</div>
			</div>
		</div>
	);
}