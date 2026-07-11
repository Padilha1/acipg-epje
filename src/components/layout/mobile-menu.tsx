import { Link } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";

export type HeaderNavItem = {
	id: string;
	label: string;
	to: string;
	hash?: string;
};

type MobileMenuProps = {
	active: string;
	isOpen: boolean;
	items: HeaderNavItem[];
	menuId: string;
	onClose: () => void;
	signupHash?: string;
};

export function MobileMenu({
	active,
	isOpen,
	items,
	menuId,
	onClose,
	signupHash = "inscricao",
}: MobileMenuProps) {
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="mobile-menu-layer">
			<button
				type="button"
				className="mobile-menu-backdrop"
				aria-label="Fechar menu"
				onClick={onClose}
			/>
			<div className="mobile-menu-panel" id={menuId}>
				<div className="mobile-menu-panel__header">
					<span>Menu</span>
					<button type="button" aria-label="Fechar menu" onClick={onClose}>
						<X size={18} />
					</button>
				</div>
				<nav className="mobile-menu-nav" aria-label="Navegação mobile">
					{items.map((item) => (
						<Link
							to={item.to}
							hash={item.hash}
							aria-current={active === item.id ? "page" : undefined}
							onClick={onClose}
							key={item.id}
						>
							{item.label}
						</Link>
					))}
				</nav>
				<Link
					className="mobile-menu-cta"
					to="/"
					hash={signupHash}
					onClick={onClose}
				>
					Inscrever-se
					<ArrowUpRight size={16} />
				</Link>
			</div>
		</div>
	);
}
