import { useQuery } from "@tanstack/react-query";
import { getAllTranscripts } from "../api/service";

const TranscriptPage = () => {
	const { data, status, error } = useQuery({
		queryKey: ["MongoCollection"],
		queryFn: async () => {
			const response = await getAllTranscripts();
			return response;
		},
	});

	if (status === "loading") return <div>Loading...</div>;

	if (data === undefined) return <div>data is undefined</div>;
	return (
		<div>
			<h1>Transcript Page</h1>
		</div>
	);
};

export default TranscriptPage;
