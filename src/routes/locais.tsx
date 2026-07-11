import { createFileRoute } from "@tanstack/react-router";
import {
	Building2,
	Bus,
	Copy,
	Factory,
	MapPin,
	Navigation,
	Utensils,
} from "lucide-react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/locais")({
	component: LocationsPage,
});

const placeGroups = [
	{
		title: "Pontos de encontro",
		icon: Building2,
		items: [
			{
				name: "Campus Central - UEPG",
				address: "Praça Santos Andrade, 1 - Centro, Ponta Grossa - PR",
				featured: true,
			},
		],
	},
	{
		title: "Indústrias das visitas técnicas",
		icon: Factory,
		items: [
			{
				name: "Heineken Brasil",
				address:
					"Av. Sen. Flávio Carvalho Guimarães, 600 - Distrito Industrial",
				featured: true,
			},
			{
				name: "DAF Caminhões",
				address: "PR-151, km 170 - Zona Rural, Ponta Grossa - PR",
				featured: true,
			},
		],
	},
	{
		title: "Restaurantes sugeridos",
		icon: Utensils,
		items: [
			{
				name: "Restaurante Popular",
				address: "R. Vicente Machado, 800 - Centro",
			},
			{
				name: "Churrascaria Zancanaro",
				address: "Av. Visconde de Mauá, 1922 - Oficinas",
			},
			{
				name: "Pizzaria Martignoni",
				address: "R. Balduíno Taques, 1600 - Estrela",
			},
		],
	},
];

function LocationsPage() {
	const copyToClipboard = (value: string) => {
		void navigator.clipboard?.writeText(value);
	};

	return (
		<div className="locations-page">
			<Header active="locais" className="locations-header" />

			<main className="locations-main">
				<div className="event-container">
					<nav className="page-breadcrumb" aria-label="Caminho">
						<a href="/">Início</a>
						<span>/</span>
						<span>Locais</span>
					</nav>

					<section className="locations-intro">
						<h1>Guia de locais</h1>
						<p>
							Encontre todos os endereços essenciais para sua estadia e
							participação na Visita Técnica Ponta Grossa 2026.
						</p>
					</section>

					<section className="locations-map" aria-label="Mapa de Ponta Grossa">
						<div className="locations-map__label">
							<strong>Mapa interativo</strong>
							<span>
								Visualize os pontos de interesse de forma centralizada.
							</span>
						</div>
						<iframe
							title="Mapa de locais da Visita Técnica PG"
							src="https://www.google.com/maps?q=Ponta%20Grossa%20PR&output=embed"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
						<div className="locations-map__actions">
							<a
								href="https://www.google.com/maps/place/Ponta+Grossa,+PR"
								target="_blank"
								rel="noreferrer"
								aria-label="Abrir mapa no Google Maps"
							>
								<MapPin size={17} />
							</a>
							<a
								href="https://www.google.com/maps/search/visita+t%C3%A9cnica+ponta+grossa"
								target="_blank"
								rel="noreferrer"
								aria-label="Pesquisar rotas no Google Maps"
							>
								<Navigation size={17} />
							</a>
						</div>
					</section>

					<div className="locations-groups">
						{placeGroups.map((group) => {
							const Icon = group.icon;

							return (
								<section className="locations-group" key={group.title}>
									<h2>
										<span>
											<Icon size={17} />
										</span>
										{group.title}
									</h2>
									<div className="locations-grid">
										{group.items.map((place) => (
											<article
												className={
													place.featured
														? "location-card location-card--featured"
														: "location-card"
												}
												key={place.name}
											>
												{place.featured ? (
													<div className="location-card__image" />
												) : null}
												<h3>{place.name}</h3>
												<p>{place.address}</p>
												<div className="location-card__actions">
													<button
														type="button"
														onClick={() => copyToClipboard(place.address)}
													>
														<Copy size={14} />
														Copiar
													</button>
													<a
														href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
															place.address,
														)}`}
														target="_blank"
														rel="noreferrer"
													>
														<Navigation size={14} />
														Rota
													</a>
												</div>
											</article>
										))}
									</div>
								</section>
							);
						})}

						<section className="locations-transport">
							<div>
								<Bus size={54} />
							</div>
							<div>
								<h2>Terminal Rodoviário de Ponta Grossa</h2>
								<p>
									O principal hub de chegada para visitantes. Localizado no
									bairro de Oficinas, com fácil acesso ao centro.
								</p>
								<div>
									<button
										type="button"
										onClick={() =>
											copyToClipboard("Terminal Rodoviário de Ponta Grossa")
										}
									>
										Copiar endereço
									</button>
									<a
										href="https://www.google.com/maps/search/Terminal+Rodovi%C3%A1rio+de+Ponta+Grossa"
										target="_blank"
										rel="noreferrer"
									>
										Abrir no Google Maps
									</a>
								</div>
							</div>
						</section>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
