import { useEffect, useState } from "react";

export const useGetUrlParams = () => {
	const [url, setUrl] = useState("");

	function setURlParams(object) {
		setUrl(new URLSearchParams(object));
	}

	return [url.toString(), setURlParams];
};
