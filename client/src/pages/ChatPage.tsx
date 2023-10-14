import { Menu, Plus, SendHorizontal } from "lucide-react";
import Message from "../components/message";
import { useEffect, useRef, useState } from "react";
import useAutoResizeTextArea from "../hooks/useAutoResizeTextArea";
import Logo from "../assets/react.svg";
import { DEFAULT_OPENAI_MODEL } from "../shared/Constants";
import { ChatMessage } from "../api/model";
import { handleBotResponse } from "../helpers/openaiStream";

const ChatPage = (props: any) => {
	const { toggleComponentVisibility } = props;
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]); // [Message]
	const textAreaRef = useAutoResizeTextArea();
	const bottomOfChatRef = useRef<HTMLDivElement>(null);

	const selectedModel = DEFAULT_OPENAI_MODEL;

	const handleInputChange = (event: any) => {
		setInput(event.target.value);
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setIsLoading(true);

		// Get user input from the input field
		const userInput = input;

		// Create a new Message object
		const userMessage = { role: "user", content: userInput };
		const botMessage = { role: "bot", content: "" };

		// Add the user message to the messages hook
		setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);

		// getting response from server based on the user prompt
		const response = await fetch("api/openai/aiCompletion", {
			method: "post",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userPrompt: userInput }),
		});

		if (!response.ok || !response.body) {
			throw new Error(response.statusText);
		}

		// Start handling the bot response stream
		await handleBotResponse(
			response.body.getReader(),
			setMessages,
			setIsLoading
		);
	};

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "24px";
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	}, [input, textAreaRef]);

	useEffect(() => {
		if (bottomOfChatRef.current) {
			bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="flex max-w-full flex-1 flex-col">
			<div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
				<button
					type="button"
					className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white hover:text-white"
					onClick={toggleComponentVisibility}
				>
					<span className="sr-only">Open sidebar</span>
					<Menu className="h-6 w-6 text-white" />
				</button>
				<h1 className="flex-1 text-center text-base font-normal">New chat</h1>
				<button type="button" className="px-3">
					<Plus className="h-6 w-6" />
				</button>
			</div>
			<div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
				<div className="flex-1 overflow-hidden">
					<div className="react-scroll-to-bottom--css-ikyem-79elbk h-full bg-gray-800">
						<div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
							{messages.length > 0 ? (
								<div className="flex flex-col items-center text-sm bg-gray-800">
									<div className="flex w-full items-center justify-center gap-1 border-b p-3 border-gray-900/50 bg-gray-700 text-gray-300">
										Model: {selectedModel.name}
									</div>
									{messages.map((message, index) => (
										<Message key={index} message={message} />
									))}
									<div className="w-full h-32 md:h-48 flex-shrink-0"></div>
									<div ref={bottomOfChatRef}></div>
								</div>
							) : null}
							{messages.length === 0 ? (
								<div className="py-10 relative w-full flex flex-col h-full">
									<div className="flex items-center justify-center gap-2"></div>
									<div className="flex flex-col h-full justify-center space-y-2 align-middle items-center">
										<img
											src={Logo}
											width={100}
											height={100}
											alt="Picture of the author"
											className="shadow-full"
										/>
										<h1 className="text-2xl sm:text-4xl font-semibold text-gray-200">
											SES | GPT
										</h1>
									</div>
								</div>
							) : null}
							<div className="flex flex-col items-center text-sm bg-gray-800"></div>
						</div>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 border-white/20 md:border-transparent md:bg-vert-light-gradient bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
					<form
						className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
						onSubmit={handleSubmit}
					>
						<div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
							<div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-gray-900/50 text-white bg-gray-700 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]">
								<textarea
									ref={textAreaRef}
									value={input}
									data-id="root"
									style={{
										height: "24px",
										maxHeight: "200px",
										overflowY: "hidden",
									}}
									placeholder="Send a message..."
									className="m-0 w-full resize-none border-0 p-0 pr-7 focus:ring-0 focus-visible:ring-0 bg-transparent pl-2 md:pl-0"
									onChange={handleInputChange}
								></textarea>
								<button
									onKeyDown={(e) => {
										handleSubmit(e);
									}}
									type="submit"
									tabIndex={0}
									disabled={isLoading || input?.length === 0}
									className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
								>
									<SendHorizontal className="h-4 w-4 mr-1 text-white " />
								</button>
							</div>
						</div>
					</form>
					<div className="px-3 pt-2 pb-3 text-center text-xs text-white/50 md:px-4 md:pt-3 md:pb-6">
						<span>
							SES GPT may produce inaccurate information about people, places,
							or facts.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatPage;
