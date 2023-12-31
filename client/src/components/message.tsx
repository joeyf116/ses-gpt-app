import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Bot, TextCursor, User2 } from "lucide-react";

const Message = (props: any) => {
	const { message } = props;
	const { role, content: text } = message;

	const isUser = role === "user";

	return (
		<div
			className={`group w-full text-gray-100 border-b border-gray-900/50 ${
				isUser ? "bg-gray-800" : "bg-[#444654]"
			}`}
		>
			<div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
				<div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
					<div className="w-8 flex flex-col relative items-end">
						<div className="relative h-7 w-7 p-1 rounded-sm text-white flex items-center justify-center bg-black/75 text-opacity-100r">
							{isUser ? (
								<User2 className="h-4 w-4 text-white" />
							) : (
								<Bot className="h-4 w-4 text-white" />
							)}
						</div>
						<div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
							<button disabled className="text-gray-400"></button>
							<span className="flex-grow flex-shrink-0">1 / 1</span>
							<button disabled className="text-gray-400"></button>
						</div>
					</div>
					<div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
						<div className="flex flex-grow flex-col gap-3">
							<div className="min-h-20 flex flex-col items-start gap-4">
								{!isUser && text === null ? (
									<TextCursor className="h-6 w-6 animate-pulse" />
								) : (
									<div className="w-full prose-invert dark markdown prose">
										<ReactMarkdown
											// eslint-disable-next-line
											children={text}
											remarkPlugins={[remarkMath, remarkGfm]}
											rehypePlugins={[rehypeKatex]}
											components={{
												code(props) {
													const { children, className, node, ...rest } = props;
													return (
														<div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800 scrollbar-thumb-rounded-md">
															<code {...rest} className={`${className}`}>
																{children}
															</code>
														</div>
													);
												},
											}}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Message;
