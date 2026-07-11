import { Facebook, Instagram } from "lucide-react";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="event-footer">
			<div className="event-container event-footer__grid">
				<div>
					<img
						className="event-footer__logo"
						src="/logo.png"
						alt="Visita Técnica PG"
					/>
					<p>
						Um evento dedicado ao aprimoramento profissional e descoberta do
						potencial industrial dos Campos Gerais.
					</p>
					<div className="event-socials">
						<a href="/fotos" aria-label="Instagram">
							<Instagram size={15} />
						</a>
						<a href="/fotos" aria-label="Facebook">
							<Facebook size={15} />
						</a>
					</div>
				</div>
				<nav aria-label="Acesso rápido">
					<span>Acesso rápido</span>
					<a href="/">Início do evento</a>
					<a href="/programacao">Cronograma</a>
					<a href="/hospedagem">Hospedagens</a>
					<a href="/locais">Locais</a>
				</nav>
				<nav aria-label="Suporte">
					<span>Suporte</span>
					<a href="/locais">FAQ</a>
					<a href="/locais">Privacidade</a>
					<a href="/locais">Termos de uso</a>
					<a href="/locais">Contato</a>
				</nav>
			</div>
			<div className="event-container event-footer__bottom">
				<span>
					© {currentYear} Acipg Jovem EPJE. Todos os direitos reservados.
				</span>
				<span>
					Desenvolvido com ❤️ por{" "}
					<a
						href="https://padilha-eight.vercel.app/"
						target="_blank"
						rel="noreferrer"
					>
						Kaiser Tech
					</a>
				</span>
			</div>
		</footer>
	);
}
