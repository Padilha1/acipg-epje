import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { type HeaderNavItem, MobileMenu } from "./mobile-menu";

type HeaderProps = {
	active:
		| "inicio"
		| "visitas"
		| "programacao"
		| "hospedagem"
		| "locais"
		| "fotos";
	className?: string;
};

const navItems: HeaderNavItem[] = [
	{ id: "inicio", label: "Início", to: "/", hash: "inicio" },
	{ id: "visitas", label: "Visitas Técnicas", to: "/visitas-tecnicas" },
	{ id: "programacao", label: "Programação", to: "/programacao" },
	{ id: "hospedagem", label: "Hospedagem", to: "/hospedagem" },
	{ id: "locais", label: "Locais", to: "/locais" },
	{ id: "fotos", label: "Fotos", to: "/fotos" },
];

export function Header({ active, className }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuId = useId();

	useEffect(() => {
		const updateHeaderState = () => setIsScrolled(window.scrollY > 18);

		updateHeaderState();
		window.addEventListener("scroll", updateHeaderState, { passive: true });

		return () => window.removeEventListener("scroll", updateHeaderState);
	}, []);

	return (
		<header
			className={[
				"event-header",
				className,
				isScrolled ? "event-header--scrolled" : undefined,
			]
				.filter(Boolean)
				.join(" ")}
		>
			<Link
				className="event-logo"
				to="/"
				hash={active === "inicio" ? "inicio" : undefined}
				aria-label="Página inicial Visita Técnica PG"
			>
				<img src="/logo.webp" alt="Visita Técnica PG" />
			</Link>
			<nav className="event-nav" aria-label="Navegação principal">
				{navItems.map((item) => (
					<Link
						to={item.to}
						hash={item.hash}
						aria-current={active === item.id ? "page" : undefined}
						key={item.id}
					>
						{item.label}
					</Link>
				))}
			</nav>
			<Link className="event-header__cta" to="/" hash="inscricao">
				Inscrever-se
			</Link>
			<button
				className="event-menu"
				type="button"
				aria-label="Abrir menu"
				aria-expanded={isMenuOpen}
				aria-controls={menuId}
				onClick={() => setIsMenuOpen(true)}
			>
				<Menu size={18} />
			</button>
			<MobileMenu
				active={active}
				isOpen={isMenuOpen}
				items={navItems}
				menuId={menuId}
				onClose={() => setIsMenuOpen(false)}
			/>
		</header>
	);
}
