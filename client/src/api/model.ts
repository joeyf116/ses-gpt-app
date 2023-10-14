export type MongoCollection = {
	_id: string;
	transcript: string;
};

export type OpenAIModel = {
    name: string;
    id: string;
    available: boolean;
  };

export type ChatMessage = {
    role: string;
    content: string;
}
  