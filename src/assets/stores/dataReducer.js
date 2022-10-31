import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
	initialState: {
		catsData: [],
		favoriteCats: JSON.parse(localStorage.getItem("favoriteCats")) || [],
        firstRender: false
	},
	name: "data",
	reducers: {
		setCatsData(state, actions) {
			state.catsData = [...state.catsData, ...actions.payload];
		},
		setFavoriteCats(state, actions) {
			state.catsData = state.catsData.map((cat) => {
				if (cat.id === actions.payload.id) {
					return { ...cat, like: true };
				} else {
					return cat;
				}
			});
			state.favoriteCats = [...state.favoriteCats, { ...actions.payload, like: true }];
		},
		deleteFavoriteCat(state, actions) {
			state.catsData = state.catsData.map((cat) => {
				if (cat.id === actions.payload.id) {
					return { ...cat, like: false };
				} else {
					return cat;
				}
			});
			state.favoriteCats = state.favoriteCats.filter((cat) => cat.id !== actions.payload.id);
		},
        setFirstRender(state) {
            state.firstRender = true
        }
	},
});

export const { setCatsData, setFavoriteCats, deleteFavoriteCat, setFirstRender } = dataSlice.actions;
export default dataSlice.reducer;
