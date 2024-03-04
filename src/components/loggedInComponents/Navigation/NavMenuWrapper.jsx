const NavMenuWrapper = ({ children, setIsMenuVisible, isMenuVisible }) => {
	return (
		<span
			onMouseLeave={() => setIsMenuVisible(false)}
			onMouseEnter={() => setIsMenuVisible(true)}
			onClick={() => setIsMenuVisible(true)}
		>
			{children}
		</span>
	);
};

export default NavMenuWrapper;
