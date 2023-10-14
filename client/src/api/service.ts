import { MongoCollection } from "./model";

export const getAllTranscripts = async (): Promise<MongoCollection[]> => {
	const response = await fetch("api/transcript/getall");
	const body = await response.json();
	if (response.status !== 200) {
		throw Error(body.message);
	}

	return body;
};
