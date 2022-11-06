
export const options = {
	api_key: "live_wgTVl4q73CIJTgweqoNx741qVwh7OXb3haDqoKRm8y1Bw2oi3YREmLHTxZaCVj9X",
	limit: 20,
	order: "ASC",
	baseUrl: "https://api.thecatapi.com/v1",
	getCatsUrl: "/images/search?",
};

export class AllUrlParams {
	constructor(limit, page, order) {
		this.limit = limit;
		this.page = page;
		this.order = order;
	}

	get url() {
		let url = new URLSearchParams(this);

		return url.toString();
	}
}
