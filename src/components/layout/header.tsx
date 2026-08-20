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
		| "patrocinadores"
		| "locais"
		| "fotos";
	className?: string;
};

const navItems: HeaderNavItem[] = [
	{ id: "inicio", label: "Início", to: "/", hash: "inicio" },
	{ id: "visitas", label: "Visitas Técnicas", to: "/visitas-tecnicas" },
	{ id: "programacao", label: "Programação", to: "/programacao" },
	{ id: "hospedagem", label: "Hospedagem", to: "/hospedagem" },
	{ id: "patrocinadores", label: "Patrocinadores", to: "/patrocinadores" },
	// Locais fica oculto até a confirmação final dos pontos do evento.
	// { id: "locais", label: "Locais", to: "/locais" },
	// Fotos fica oculto temporariamente.
	// { id: "fotos", label: "Fotos", to: "/fotos" },
];

const signupUrl = "https://app.ciaticket.com.br/e/EPJEPG26";

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
				<img src="/logo-epje.webp" alt="EPJE Ponta Grossa" />
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
			<a
				className="event-header__cta"
				href={signupUrl}
				target="_blank"
				rel="noopener"
			>
				Inscrever-se
			</a>
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
