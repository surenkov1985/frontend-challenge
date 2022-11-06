import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllUrlParams, options } from "../components/utils/urlUtils";

export const getCats = createAsyncThunk("data/getCats", async function (options, { rejectWithValue, getState }) {
	const { baseUrl, getCatsUrl, api_key } = options;
	const { limit, pageAll, order } = getState().data;
	const allUrl = new AllUrlParams(limit, pageAll, order);
	const headers = { "Content-type": "application/json", "x-api-key": api_key };

	const response = await fetch(baseUrl + getCatsUrl + allUrl.url, {
		method: "GET",
		headers,
	});

	try {
		if (!response.ok) {
			throw new Error("Сервер не отвечает");
		}

		const data = await response.json();
		const pages = Math.ceil(response.headers.get("pagination-count") / limit);

		return { data, pages };
	} catch (error) {

		return rejectWithValue(error.message);
	}
});

export const dataSlice = createSlice({
	initialState: {
		catsData: [],
		favoriteCats: JSON.parse(localStorage.getItem("favoriteCats")) || [],
		pageAll: 0,
		limit: options.limit,
		order: options.order,
		user: JSON.parse(localStorage.getItem("catsUser")) || "",
		error: "",
		isLoading: false,
		moreText: "",
		likeMoreText: "",
		allPages: 0,
	},
	name: "data",
	reducers: {
		setFavoriteCats(state, actions) {
			state.catsData = state.catsData.map((cat) => {
				if (cat.id === actions.payload.id) {
					return { ...cat, like: true };
				} else {
					return cat;
				}
			});
			state.favoriteCats = [...state.favoriteCats, { ...actions.payload, like: true }];

			localStorage.setItem("favoriteCats", JSON.stringify(state.favoriteCats));
		},
		deleteFavoriteCats(state, actions) {
			state.catsData = state.catsData.map((cat) => {
				if (cat.id === actions.payload.id) {
					return { ...cat, like: false };
				} else {
					return cat;
				}
			});
			state.favoriteCats = state.favoriteCats.filter((cat) => cat.id !== actions.payload.id);
		},
	},
	extraReducers: {
		[getCats.pending]: (state) => {
			state.isLoading = true;
		},
		[getCats.fulfilled]: (state, actions) => {
			state.isLoading = false;
			state.allPages = actions.payload.pages;

			if (state.pageAll < state.allPages) {
				if (state.pageAll > 0) {
					state.catsData = [...state.catsData, ...actions.payload.data];
				} else {
					state.catsData = actions.payload.data;
					state.moreText = "ещё ";
				}
			}

			state.catsData = state.catsData.map((cat) => {
				let obj = state.favoriteCats.find((res) => {
					return cat.id === res.id;
				});
				if (obj) {
					return { ...cat, like: true, favorite_id: obj.id };
				} else {
					return cat;
				}
			});

			state.pageAll += 1;
		},
		[getCats.rejected]: (state, actions) => {
			state.isLoading = false;
			state.error = actions.payload;
		},
		
	},
});

export const { deleteFavoriteCats, setFavoriteCats, setError } = dataSlice.actions;
export default dataSlice.reducer;
