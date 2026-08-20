import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/patrocinadores")({
	component: SponsorsPage,
});

type SponsorLogo = {
	name: string;
	src: string;
	size?: "hero" | "large";
	emphasis?: "supporter";
};

type SponsorSection = {
	id: string;
	title: string;
	logos: SponsorLogo[];
};

const sponsorSections: SponsorSection[] = [
	{
		id: "master",
		title: "Master",
		logos: [
			{
				name: "Inbix",
				src: "/sponsors/logos/inbix.webp",
				size: "hero",
			},
		],
	},
	{
		id: "ouro",
		title: "Ouro",
		logos: [
			{
				name: "Cia Ticket",
				src: "/sponsors/logos/cia-ticket.webp",
				size: "large",
			},
		],
	},
	{
		id: "prata",
		title: "Prata",
		logos: [
			{
				name: "Slaviero",
				src: "/sponsors/logos/slaviero.webp",
				size: "large",
			},
			{
				name: "Smart",
				src: "/sponsors/logos/smart.webp",
				size: "large",
			},
			{
				name: "DBUG",
				src: "/sponsors/logos/dbug.webp",
				size: "large",
			},
			{
				name: "Ruivo Fotografia",
				src: "/sponsors/logos/ruivo.webp",
				size: "large",
			},
			{
				name: "Box Vídeo",
				src: "/sponsors/logos/box-video.webp",
				size: "large",
			},
			{
				name: "Mich",
				src: "/sponsors/logos/mich.webp",
				size: "large",
			},
			{
				name: "Brigatta",
				src: "/sponsors/logos/brigatta.webp",
				size: "large",
			},
			{
				name: "CACICPAR",
				src: "/sponsors/logos/cacicpar.webp",
				size: "large",
			},
		],
	},
	{
		id: "bronze",
		title: "Bronze",
		logos: [
			{
				name: "Rogério Junior",
				src: "/sponsors/logos/rogerio-junior.webp",
			},
			{
				name: "Kaiser Tech",
				src: "/sponsors/logos/kaiser-tech.webp",
				size: "large",
			},
			{
				name: "Win Target",
				src: "/sponsors/logos/win-target.webp",
			},
			{
				name: "DBL Turismo",
				src: "/sponsors/logos/dbl-turismo.webp",
				size: "large",
			},
			{
				name: "Thanile Ratti",
				src: "/sponsors/logos/thani-ratti.webp",
				size: "large",
			},
			{
				name: "Pega Essa Ideia",
				src: "/sponsors/logos/pega-essa-ideia.webp",
				size: "large",
			},
			{
				name: "Fernanda Suguiama",
				src: "/sponsors/logos/fernanda-suguiama.webp",
				size: "large",
			},
			{
				name: "Eletroluz",
				src: "/sponsors/logos/eletroluz.webp",
				size: "large",
			},
		],
	},
	{
		id: "apoiadores",
		title: "Apoiadores",
		logos: [
			{
				name: "Diário dos Campos",
				src: "/sponsors/logos/diario-dos-campos.webp",
				emphasis: "supporter",
			},
			{
				name: "Mediar",
				src: "/sponsors/logos/mediar.webp",
			},
			{
				name: "Rivus",
				src: "/sponsors/logos/rivus.webp",
			},
			{
				name: "Agrocete",
				src: "/sponsors/logos/agrocete.svg",
			},
			{
				name: "Ambev",
				src: "/sponsors/logos/ambev.webp",
			},
			{
				name: "Cargill",
				src: "/sponsors/logos/cargill.webp",
			},
			{
				name: "Estação Hub",
				src: "/sponsors/logos/logo-1.webp",
			},
			{
				name: "Fidelitarget",
				src: "/sponsors/logos/fidelitarget.webp",
			},
			{
				name: "FT Sementes",
				src: "/sponsors/logos/ft-sementes.webp",
			},
			{
				name: "Heineken",
				src: "/sponsors/logos/heineken.webp",
			},
			{
				name: "Maltaria Campos Gerais",
				src: "/sponsors/logos/maltaria.webp",
			},
			{
				name: "Operário Ferroviário",
				src: "/sponsors/logos/operario.webp",
			},
			{
				name: "Palmeira Ambiental",
				src: "/sponsors/logos/palmeira-ambiental.webp",
			},
			{
				name: "Pelissari",
				src: "/sponsors/logos/pelissari.webp",
			},
			{
				name: "Tetra Pak",
				src: "/sponsors/logos/tetra-pak.webp",
			},
			{
				name: "Maluí",
				src: "/sponsors/logos/malui.webp",
			},
			{
				name: "Deca Eventos",
				src: "/sponsors/logos/deca-festas.webp",
				emphasis: "supporter",
			},
		],
	},
];

function SponsorsPage() {
	return (
		<div className="sponsors-page">
			<Header active="patrocinadores" className="sponsors-header" />

			<main className="sponsors-main">
				<section className="event-container sponsors-hero">
					<h1>Patrocinadores e Parceiros</h1>
					<p>
						Marcas que apoiam esta experiência técnica em Ponta Grossa.
					</p>
				</section>

				<section className="event-container sponsors-showcase">
					{sponsorSections.map((section) => (
						<div
							className={`sponsors-tier sponsors-tier--${section.id}`}
							key={section.id}
						>
							<h2>{section.title}</h2>
							<div className="sponsors-logo-grid">
								{section.logos.map((logo) => (
									<article
										className={[
											"sponsors-logo-card",
											logo.size ? `sponsors-logo-card--${logo.size}` : undefined,
											logo.emphasis === "supporter"
												? "sponsors-logo-card--supporter"
												: undefined,
										]
											.filter(Boolean)
											.join(" ")}
										key={logo.name}
									>
										<img src={logo.src} alt={logo.name} loading="lazy" />
									</article>
								))}
							</div>
						</div>
					))}
				</section>
			</main>

			<Footer />
		</div>
	);
}
