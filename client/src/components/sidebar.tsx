import { LogOut, MessageSquare, Plus, Trash } from "lucide-react";

const Sidebar = () => {
	return (
		<div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
			<nav className="flex h-full flex-1 flex-col space-y-1 p-2">
				<a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
					<Plus className="h-4 w-4" />
					New chat
				</a>
				<div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
					<div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
						<a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
							<MessageSquare className="h-4 w-4" />
							<div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
								Conversation Title
								<div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
							</div>
						</a>
					</div>
				</div>
				<a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
					<Trash className="h-4 w-4" />
					Clear conversations
				</a>
				<a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
					<LogOut className="h-4 w-4" />
					Log out
				</a>
			</nav>
		</div>
	);
};

export default Sidebar;
