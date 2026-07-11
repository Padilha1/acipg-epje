import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle2,
	Copy,
	MapPin,
	Navigation,
	ShieldCheck,
	Star,
} from "lucide-react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/hospedagem")({
	component: LodgingPage,
});

const recommendedHotels = [
	{
		name: "Planalto Select Hotel",
		address: "R. Sete de Setembro, 652 - Centro",
		price: "R$ 280",
		tags: ["2,4 km do evento", "Estacionamento grátis"],
	},
	{
		name: "Ibis Ponta Grossa",
		address: "R. Dr. Paula Xavier, 21 - Centro",
		price: "R$ 195",
		tags: ["1,8 km do evento", "Econômico"],
	},
	{
		name: "Hotel Vila Velha",
		address: "R. Balduíno Taques, 123 - Centro",
		price: "R$ 225",
		tags: ["3,1 km do evento", "Tradicional"],
	},
];

function LodgingPage() {
	return (
		<div className="lodging-page">
			<Header active="hospedagem" className="lodging-header" />

			<main className="lodging-main">
				<div className="event-container">
					<nav className="page-breadcrumb" aria-label="Caminho">
						<a href="/">Início</a>
						<span>/</span>
						<span>Hospedagem</span>
					</nav>

					<section className="lodging-feature">
						<div className="lodging-feature__media">
							<span>Hotel Oficial do Evento</span>
						</div>
						<div className="lodging-feature__content">
							<h1>Premium Executive Ponta Grossa</h1>
							<p>
								O ponto de encontro dos palestrantes e da organização, com
								infraestrutura completa para descanso, networking e deslocamento
								até os locais das visitas técnicas.
							</p>
							<ul>
								<li>
									<CheckCircle2 size={16} /> Café da manhã incluso e Wi-Fi de
									alta velocidade.
								</li>
								<li>
									<CheckCircle2 size={16} /> Transfer gratuito para os locais
									das visitas técnicas.
								</li>
								<li>
									<CheckCircle2 size={16} /> Early check-in e late check-out sob
									disponibilidade.
								</li>
							</ul>
							<div className="lodging-coupon">
								<span>Código promocional</span>
								<strong>VISITAPG24</strong>
								<p>Garanta 15% de desconto exclusivo para participantes.</p>
								<Copy size={17} />
							</div>
							<a className="lodging-reserve-button" href="/#inscricao">
								Reservar agora
							</a>
						</div>
					</section>

					<section className="lodging-content-grid">
						<div>
							<div className="lodging-section-heading">
								<h2>Outras opções recomendadas</h2>
								<span>3 opções próximas</span>
							</div>
							<div className="lodging-hotel-list">
								{recommendedHotels.map((hotel, index) => (
									<article className="lodging-hotel-card" key={hotel.name}>
										<div className="lodging-hotel-card__image">{index + 1}</div>
										<div className="lodging-hotel-card__body">
											<div>
												<h3>{hotel.name}</h3>
												<p>
													<MapPin size={14} />
													{hotel.address}
												</p>
											</div>
											<div className="lodging-hotel-card__rating">
												{[1, 2, 3, 4, 5].map((star) => (
													<Star
														size={14}
														fill={
															star <= 4 - (index % 2) ? "currentColor" : "none"
														}
														key={`${hotel.name}-${star}`}
													/>
												))}
											</div>
											<div className="lodging-hotel-card__tags">
												{hotel.tags.map((tag) => (
													<span key={tag}>{tag}</span>
												))}
											</div>
											<div className="lodging-hotel-card__footer">
												<span>
													A partir de <strong>{hotel.price}</strong>/noite
												</span>
												<a href="/#inscricao">Ver detalhes</a>
											</div>
										</div>
									</article>
								))}
							</div>
						</div>

						<aside className="lodging-sidebar">
							<div className="lodging-map-card">
								<h2>Guia de localização</h2>
								<p>
									Veja onde os hotéis estão situados em relação à UEPG e aos
									parques industriais.
								</p>
								<iframe
									title="Mapa de hospedagem em Ponta Grossa"
									src="https://www.google.com/maps?q=Ponta%20Grossa%20PR%20Centro&output=embed"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
								<a
									href="https://www.google.com/maps/search/hot%C3%A9is+Ponta+Grossa+PR"
									target="_blank"
									rel="noreferrer"
								>
									Mapa interativo
								</a>
							</div>
							<div className="lodging-info-card">
								<h2>Orientações importantes</h2>
								<div>
									<Navigation size={18} />
									<strong>Transporte coletivo</strong>
									<p>
										Haverá vans saindo do hotel oficial a cada 30 minutos em
										direção ao Campus UEPG.
									</p>
								</div>
								<div>
									<ShieldCheck size={18} />
									<strong>Check-in facilitado</strong>
									<p>
										Apresente seu comprovante de inscrição no balcão do hotel
										para agilizar sua entrada.
									</p>
								</div>
							</div>
						</aside>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}
