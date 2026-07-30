import { Facebook, Instagram } from "lucide-react";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="event-footer">
			<div className="event-container event-footer__grid">
				<div>
					<img
						className="event-footer__logo"
						src="/logo.webp"
						alt="Visita Técnica PG"
					/>
					<p>
						Um evento dedicado ao aprimoramento profissional e descoberta do
						potencial empresarial dos Campos Gerais.
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
					<a href="/">Início</a>
					<a href="/visitas-tecnicas">Visitas Técnicas</a>
					<a href="/programacao">Programação</a>
				</nav>
				<nav aria-label="Evento">
					<span>Evento</span>
					<a href="/hospedagem">Hospedagem</a>
					<a href="/patrocinadores">Patrocinadores</a>
					<a href="/fotos">Fotos</a>
					<a href="/#inscricao">Inscrever-se</a>
				</nav>
				<nav aria-label="Suporte">
					<span>Suporte</span>
					<a href="mailto:acipgjovem@gmail.com">acipgjovem@gmail.com</a>
				</nav>
			</div>
			<div className="event-container event-footer__bottom">
				<span>
					© {currentYear} Acipg Jovem EPJE. Todos os direitos reservados.
				</span>
				<span>
					Desenvolvido com ❤️ por{" "}
					<a
						className="event-footer__credit-link"
						href="https://kaisertec.com.br?utm_source=epje&utm_medium=footer&utm_campaign=epje_pg"
						target="_blank"
						rel="noopener"
					>
						<img src="/kaiserPreto.png" alt="" aria-hidden="true" />
						Kaiser Tech
					</a>
				</span>
			</div>
		</footer>
	);
}
