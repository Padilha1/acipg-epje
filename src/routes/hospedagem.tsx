import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle2,
	ExternalLink,
	MapPin,
	ShieldCheck,
	Star,
} from "lucide-react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/hospedagem")({
	component: LodgingPage,
});

const slavieroBookingUrl =
	"https://book.omnibees.com/chain/1409/hotel/15710?c=1409&currencyId=16&lang=pt-BR&q=15710";

const recommendedHotels = [
	{
		name: "Planalto Select Hotel",
		address: "R. Sete de Setembro, 652 - Centro",
		rateLabel: "R$ 349/noite",
		tags: ["2,4 km da ACIPG", "Estacionamento grátis"],
		url: "https://hotelplanalto.com/",
	},
	{
		name: "Hotel Princess",
		address: "Rua Minas Gerais, 2222 - Nova Rússia",
		rateLabel: "Sob consulta",
		tags: ["3,5 km da ACIPG", "Café da manhã"],
		url: "https://hotelprincess.com.br/",
	},
	{
		name: "Ibis Ponta Grossa",
		address: "R. Dr. Paula Xavier, 21 - Centro",
		rateLabel: "R$ 330/noite",
		tags: ["1,8 km da ACIPG"],
		url: "https://all.accor.com/booking/pt-br/ibis/hotels/ponta-grossa-state-of-parana-brazil",
	},
	{
		name: "Premium Vila Velha Ponta Grossa",
		address: "R. Balduíno Taques, 123 - Centro",
		rateLabel: "R$ 385/noite",
		tags: ["3,1 km da ACIPG", "Tradicional"],
		url: "https://www.letsatlantica.com.br/premium-vila-velha-ponta-grossa",
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
							<img
								src="/sponsors/slaviero-ponta-grossa.webp"
								alt="Fachada do Slaviero Ponta Grossa"
								loading="eager"
							/>
							<span>Hotel Oficial do Evento</span>
						</div>
						<div className="lodging-feature__content">
							<h1>Slaviero Ponta Grossa</h1>
							<p>
								Hotel oficial do evento em Ponta Grossa, localizado na Avenida
								Flex, 376, Colônia Dona Luíza. Uma base confortável para
								descanso, networking e deslocamento durante a programação.
							</p>
							<ul>
								<li>
									<CheckCircle2 size={16} /> Café da manhã incluso e Wi-Fi de
									alta velocidade.
								</li>
								<li>
									<CheckCircle2 size={16} /> Estacionamento gratuito para
									hóspedes.
								</li>
								<li>
									<CheckCircle2 size={16} /> Avenida Flex, 376 - Colônia Dona
									Luíza, Ponta Grossa - PR, 84043-450.
								</li>
							</ul>
							<div className="lodging-coupon">
								<span>Cupom de desconto</span>
								<strong>EPJE15</strong>
								<p>
									Use o código na reserva para acessar as condições especiais do
									evento.
								</p>
								<ExternalLink size={17} />
							</div>
							<a
								className="lodging-reserve-button"
								href={slavieroBookingUrl}
								target="_blank"
								rel="noreferrer"
							>
								Reservar agora
							</a>
						</div>
					</section>

					<section className="lodging-content-grid">
						<div>
							<div className="lodging-section-heading">
								<h2>Outras opções recomendadas</h2>
								<span>4 opções próximas</span>
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
													Tarifa <strong>{hotel.rateLabel}</strong>
												</span>
												<a href={hotel.url} target="_blank" rel="noreferrer">
													Ver detalhes
												</a>
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
									src="https://www.google.com/maps?q=Slaviero%20Ponta%20Grossa%20Avenida%20Flex%20376&output=embed"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
								<a
									href="https://www.google.com/maps/search/?api=1&query=Slaviero%20Ponta%20Grossa%20Avenida%20Flex%20376"
									target="_blank"
									rel="noreferrer"
								>
									Mapa interativo
								</a>
							</div>
							<div className="lodging-info-card">
								<h2>Orientações importantes</h2>
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
