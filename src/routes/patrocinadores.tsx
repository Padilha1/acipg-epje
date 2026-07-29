import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/patrocinadores")({
	component: SponsorsPage,
});

function SponsorsPage() {
	return (
		<div className="sponsors-page">
			<Header active="patrocinadores" className="sponsors-header" />

			<main className="sponsors-main">
				<section className="event-container sponsors-welcome">
					<img
						className="sponsors-welcome__illustration"
						src="/sponsors/mascot-welcome.webp"
						alt="Mascote 3D convidando patrocinadores e parceiros"
					/>
					<h1>Sejam bem-vindos, Patrocinadores e Parceiros!</h1>
				</section>
			</main>

			<Footer />
		</div>
	);
}
