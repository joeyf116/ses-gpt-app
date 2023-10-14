import { Outlet } from "react-router-dom";
import MobileSidebar from "../components/mobileSidebar";
import Sidebar from "../components/sidebar";
import { useState } from "react";

const Layout = () => {
	const [isComponentVisible, setIsComponentVisible] = useState(false);

	const toggleComponentVisibility = () => {
		setIsComponentVisible(!isComponentVisible);
	};

	return (
		<main className="overflow-hidden w-full h-[100dvh] relative flex">
			{isComponentVisible ? (
				<MobileSidebar toggleComponentVisibility={toggleComponentVisibility} />
			) : null}
			<div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
				<div className="flex h-full min-h-0 flex-col">
					<Sidebar />
				</div>
			</div>
			<Outlet />
		</main>
	);
};

export default Layout;
