import { createFileRoute } from "@tanstack/react-router";
import {
	AlertTriangle,
	Bus,
	CheckCircle2,
	ChevronDown,
	ClipboardCheck,
	Info,
	MapPin,
	Search,
	ShieldAlert,
	X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/visitas-tecnicas")({
	component: TechnicalVisitsPage,
});

const visits = [
	{
		category: "Indústria",
		title: "Heineken Brasil",
		location: "Av. Pref. Luiz Alberto de Castro, 1000 - Contorno",
		meeting: "Bloco Central (Estacionamento Principal)",
		noteTitle: "Requisitos de Segurança",
		noteItems: [
			"Uso obrigatório de calçado fechado",
			"Calça comprida (jeans ou similar)",
			"Cabelos presos",
		],
		tone: "danger",
		icon: AlertTriangle,
	},
	{
		category: "Logística",
		title: "Terminal Multimodal Rumo",
		location: "Distrito Industrial, Ponta Grossa - PR",
		meeting: "Portaria de Visitantes A1",
		noteTitle: "Requisitos",
		noteItems: ["Calçado fechado e sem salto", "Identificação original (RG)"],
		tone: "success",
		icon: Info,
	},
	{
		category: "Agroindústria",
		title: "DAF Caminhões",
		location: "Rodovia PR-151, km 150",
		meeting: "Recepção Principal (Check-in 15min antes)",
		noteTitle: "EPI Necessário",
		noteItems: [
			"Colete refletivo (fornecido)",
			"Protetor auricular (fornecido)",
			"Óculos de proteção (fornecido)",
		],
		tone: "danger",
		icon: ShieldAlert,
	},
	{
		category: "Agroindústria",
		title: "Unium - Unidade de Lácteos",
		location: "Castro-PR (Saída de Ponta Grossa)",
		meeting: "Estacionamento da Rodoviária Municipal",
		noteTitle: "Observações",
		noteItems: [
			"Vedado o uso de adornos (anéis, brincos)",
			"Proibido levar alimentos",
		],
		tone: "success",
		icon: CheckCircle2,
	},
	{
		category: "Indústria",
		title: "Águia Sistemas",
		location: "Avenida União Pan-Americana, 500",
		meeting: "Auditório de Boas-Vindas (Entrada 2)",
		noteTitle: "Regras Gerais",
		noteItems: [
			"Uso de máscara em áreas específicas",
			"Calçado fechado antiderrapante",
		],
		tone: "success",
		icon: ClipboardCheck,
	},
	{
		category: "Manufatura",
		title: "BO Paper",
		location: "Rodovia PR-151, Arapoti - PR",
		meeting: "Saída do ônibus oficial às 07:00h (Portão 3)",
		noteTitle: "Atenção Especial",
		noteItems: [
			"Assinatura de Termo de Responsabilidade",
			"Proibido fotografar áreas de produção",
		],
		tone: "danger",
		icon: AlertTriangle,
	},
];

const categories = Array.from(new Set(visits.map((visit) => visit.category)));

function normalizeSearch(value: string) {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

function TechnicalVisitsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("todas");
	const hasActiveFilters =
		searchTerm.trim() !== "" || selectedCategory !== "todas";
	const filteredVisits = useMemo(() => {
		const normalizedSearch = normalizeSearch(searchTerm);

		return visits.filter((visit) => {
			const matchesCategory =
				selectedCategory === "todas" || visit.category === selectedCategory;
			const matchesSearch = normalizeSearch(
				`${visit.title} ${visit.location} ${visit.category}`,
			).includes(normalizedSearch);

			return matchesCategory && matchesSearch;
		});
	}, [searchTerm, selectedCategory]);
	const firstVisitGroup = filteredVisits.slice(0, 3);
	const secondVisitGroup = filteredVisits.slice(3);

	return (
		<div className="technical-visits-page">
			<Header active="visitas" className="technical-visits-header" />

			<main className="technical-visits-main">
				<div className="event-container">
					<nav className="technical-visits-breadcrumb" aria-label="Caminho">
						<a href="/">Início</a>
						<span>/</span>
						<span>Visitas Técnicas</span>
					</nav>

					<section className="technical-visits-intro">
						<h1>Visitas Técnicas</h1>
						<p>
							As visitas técnicas da edição 2026 em Ponta Grossa foram
							planejadas para conectar o conhecimento acadêmico à realidade
							industrial e logística da região. Nosso objetivo é proporcionar
							uma imersão em ambientes de alta tecnologia, sustentabilidade e
							gestão eficiente, permitindo que os participantes compreendam
							processos complexos em diversos setores estratégicos.
						</p>
					</section>

					<form
						className="technical-visits-filters"
						onSubmit={(event) => event.preventDefault()}
					>
						<label>
							<span>Buscar visita</span>
							<div className="technical-visits-field">
								<Search size={16} />
								<input
									type="search"
									placeholder="Nome da empresa ou local"
									aria-label="Nome da empresa ou local"
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
								/>
							</div>
						</label>
						<label>
							<span>Categoria</span>
							<div className="technical-visits-field technical-visits-field--select">
								<select
									aria-label="Categoria"
									value={selectedCategory}
									onChange={(event) => setSelectedCategory(event.target.value)}
								>
									<option value="todas">Todas</option>
									{categories.map((category) => (
										<option value={category} key={category}>
											{category}
										</option>
									))}
								</select>
								<ChevronDown size={16} />
							</div>
						</label>
						<button
							type="button"
							className="technical-visits-filter-button"
							disabled={!hasActiveFilters}
							onClick={() => {
								setSearchTerm("");
								setSelectedCategory("todas");
							}}
						>
							<X size={16} />
							Limpar filtros
						</button>
					</form>

					<section
						className="technical-visits-grid"
						aria-label="Lista de visitas"
					>
						{firstVisitGroup.map((visit) => (
							<TechnicalVisitCard key={visit.title} visit={visit} />
						))}
					</section>

					{filteredVisits.length > 0 ? (
						<>
							<section className="technical-visits-cta">
								<div>
									<h2>Vagas Limitadas!</h2>
									<p>
										Garanta seu lugar nas visitas técnicas mais concorridas do
										ano. As inscrições encerram ao atingir a capacidade máxima
										de cada ônibus.
									</p>
								</div>
								<a href="/#inscricao">Inscrever-se Agora</a>
							</section>

							{secondVisitGroup.length > 0 ? (
								<section
									className="technical-visits-grid"
									aria-label="Mais visitas"
								>
									{secondVisitGroup.map((visit) => (
										<TechnicalVisitCard key={visit.title} visit={visit} />
									))}
								</section>
							) : null}
						</>
					) : (
						<div className="technical-visits-empty">
							Nenhuma visita encontrada com os filtros selecionados.
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

function TechnicalVisitCard({ visit }: { visit: (typeof visits)[number] }) {
	const NoteIcon = visit.icon;

	return (
		<article className="technical-visit-card">
			<div className="technical-visit-card__image">
				<span>{visit.category}</span>
			</div>
			<div className="technical-visit-card__body">
				<h2>{visit.title}</h2>
				<p className="technical-visit-card__location">
					<MapPin size={15} />
					{visit.location}
				</p>
				<div className="technical-visit-card__info">
					<Bus size={15} />
					<div>
						<strong>Ponto de Encontro</strong>
						<span>{visit.meeting}</span>
					</div>
				</div>
				<div
					className={`technical-visit-card__note technical-visit-card__note--${visit.tone}`}
				>
					<NoteIcon size={15} />
					<div>
						<strong>{visit.noteTitle}</strong>
						<ul>
							{visit.noteItems.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</div>
				</div>
				<a href="/visitas-tecnicas">Ver detalhes</a>
			</div>
		</article>
	);
}
