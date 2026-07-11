import { createFileRoute } from "@tanstack/react-router";
import { CloudDownload, Image, Images } from "lucide-react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/fotos")({
	component: PhotosPage,
});

const driveUrl = "https://drive.google.com/";

const photoDays = [
	{
		id: "dia-1",
		label: "Dia 01",
		description: "24 de outubro - Abertura e networking",
		photos: ["Credenciamento", "Palestra de abertura", "Networking técnico"],
	},
	{
		id: "dia-2",
		label: "Dia 02",
		description: "25 de outubro - Visitas industriais",
		photos: ["Linha de produção", "Automação industrial", "Foto oficial"],
	},
];

function PhotosPage() {
	return (
		<div className="photos-page">
			<Header active="fotos" className="photos-header" />

			<main className="photos-main">
				<div className="event-container">
					<nav className="page-breadcrumb" aria-label="Caminho">
						<a href="/">Início</a>
						<span>/</span>
						<span>Galeria de fotos</span>
					</nav>

					<section className="photos-hero">
						<div>
							<h1>
								Memórias de uma <span>experiência técnica</span>
							</h1>
							<p>
								Explore os registros oficiais da Visita Técnica Ponta Grossa
								2026. Navegue pelos dias do evento, visitas industriais e
								momentos de networking capturados pela equipe de fotografia.
							</p>
							<a href={driveUrl} target="_blank" rel="noreferrer">
								<CloudDownload size={18} />
								Baixar álbum completo
							</a>
						</div>
						<div className="photos-hero__media">
							<Images size={44} />
							<span>Foto oficial do grupo</span>
						</div>
					</section>

					<section className="photos-gallery" aria-label="Galeria oficial">
						{photoDays.map((day) => (
							<div className="photos-day" key={day.id}>
								<header>
									<h2>{day.label}</h2>
									<span>{day.description}</span>
								</header>
								<div className="photos-grid">
									{day.photos.map((photo, index) => (
										<article className="photo-card" key={photo}>
											<div
												className={`photo-card__image photo-card__image--${index + 1}`}
											>
												<Image size={30} />
											</div>
											<span>{photo}</span>
										</article>
									))}
								</div>
							</div>
						))}
					</section>

					<div className="photos-load-more">
						<a href={driveUrl} target="_blank" rel="noreferrer">
							Carregar mais fotos
						</a>
					</div>
				</div>

				<section className="photos-drive-cta">
					<div className="event-container">
						<div>
							<h2>Quer todas as fotos em alta resolução?</h2>
							<p>
								Disponibilizamos o álbum completo com os registros oficiais para
								download gratuito.
							</p>
						</div>
						<a href={driveUrl} target="_blank" rel="noreferrer">
							<CloudDownload size={18} />
							Acessar Google Drive
						</a>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
