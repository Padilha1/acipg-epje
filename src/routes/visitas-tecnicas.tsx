import { createFileRoute } from "@tanstack/react-router";
import {
	Ban,
	Building2,
	ChevronDown,
	ClipboardCheck,
	MapPin,
	Search,
	X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/visitas-tecnicas")({
	component: TechnicalVisitsPage,
});

const restrictionsByCategory: Record<string, string[]> = {
	Agro: [
		"Entrada sem documento de identificação",
		"Calçado aberto ou salto alto",
		"Fotografar áreas restritas sem autorização",
	],
	Indústria: [
		"Entrada sem documento de identificação",
		"Calçado aberto, shorts ou bermuda",
		"Fotografar áreas produtivas sem autorização",
	],
	"Tecnologia e Inovação": [
		"Entrada sem confirmação de inscrição",
		"Fotografar ambientes restritos sem autorização",
		"Compartilhar informações internas apresentadas como confidenciais",
	],
	Mentorias: [
		"Entrada sem confirmação de inscrição",
		"Gravação da mentoria sem autorização",
		"Compartilhar materiais confidenciais apresentados na atividade",
	],
	"Serviços e Outros": [
		"Entrada sem documento de identificação",
		"Fotografar áreas restritas sem autorização",
		"Deslocamento fora do grupo sem orientação da equipe",
	],
};

const visits = [
	{
		category: "Agro",
		title: "Cargill",
		location: "Rodovia BR-376, km 506 - Distrito Industrial",
		image: "/visits/cargill.webp",
		imageTone: "agro",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Demais regras serão confirmadas pela organização",
		],
	},
	{
		category: "Agro",
		title: "Agrocete",
		location: "Rua Anna Scremin, 800 - Distrito Industrial",
		image: "/visits/agrocete.webp",
		imageTone: "agro",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Demais regras serão confirmadas pela organização",
		],
	},
	{
		category: "Agro",
		title: "FT Sementes",
		location: "Av. Newton Slaviero, 2602 - Cará-Cará",
		image: "/visits/ft-sementes.webp",
		imageTone: "agro",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Demais regras serão confirmadas pela organização",
		],
	},
	{
		category: "Agro",
		title: "Frísia/Batavo",
		location: "Rodovia PR-151, km 316 - Ponta Grossa",
		image: "/visits/frisia-batavo.webp",
		imageTone: "agro",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Demais regras serão confirmadas pela organização",
		],
	},
	{
		category: "Indústria",
		title: "Heineken",
		location: "Av. Pref. Luiz Alberto de Castro, 1000 - Contorno",
		image: "/visits/heineken.webp",
		imageTone: "industria",
		requirementTitle: "Requisitos de segurança",
		requirements: [
			"Uso obrigatório de calçado fechado",
			"Calça comprida (jeans ou similar)",
			"Cabelos presos",
		],
	},
	{
		category: "Indústria",
		title: "Ambev/Cervejaria Adriática",
		location: "BR-376, km 462 - Ponta Grossa",
		image: "/visits/ambev.webp",
		imageTone: "industria",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Calça comprida",
		],
	},
	{
		category: "Indústria",
		title: "Tetra Pak",
		location: "Rodovia BR-376, km 499,5 - Colônia Dona Luíza",
		image: "/visits/tetra-pak.webp",
		imageTone: "industria",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Calça comprida",
		],
	},
	{
		category: "Indústria",
		title: "Maltaria",
		location: "Rodovia Senador Flávio Carvalho Guimarães, s/n - Boa Vista",
		image: "/visits/maltaria.webp",
		imageTone: "industria",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Calça comprida",
		],
	},
	{
		category: "Indústria",
		title: "Biofragane",
		location: "Rua Guilherme Wiecheteck, 1019",
		imageTone: "industria",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Calça comprida",
		],
	},
	{
		category: "Tecnologia e Inovação",
		title: "Estação Hub",
		location: "Rua Benjamin Constant - Centro",
		image: "/visits/estacao-hub.webp",
		imageTone: "tecnologia",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Chegada com antecedência",
			"Demais regras serão confirmadas pela organização",
		],
	},
	{
		category: "Tecnologia e Inovação",
		title: "Inbix",
		location: "Rua Ricardo Lustosa Ribas, 651 - Estrela",
		image: "/visits/inbix.webp",
		imageTone: "tecnologia",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Chegada com antecedência",
			"Demais regras serão confirmadas pela organização",
		],
	},
	{
		category: "Mentorias",
		title: "Mentoria - Brigatta",
		location: "Atividade de mentoria - local a confirmar",
		image: "/visits/brigatta.webp",
		imageTone: "mentorias",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Confirmação da inscrição",
			"Material para anotações, se desejar",
		],
	},
	{
		category: "Mentorias",
		title: "PLSS + Rivus",
		location: "Ponta Grossa - PR",
		image: "/visits/plss-rivus.webp",
		imageTone: "mentorias",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Confirmação da inscrição",
			"Material para anotações, se desejar",
		],
	},
	{
		category: "Serviços e Outros",
		title: "Palmeira Ambiental",
		location: "Rodovia BR-376, Av. B, 1657 - Colônia Dona Luíza",
		image: "/visits/palmeira-ambiental.webp",
		imageTone: "servicos",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Calçado fechado",
			"Demais regras serão confirmadas pela organização",
		],
	},
	{
		category: "Serviços e Outros",
		title: "Operário Ferroviário",
		location: "Rua Padre Nóbrega, 265 - Oficinas",
		image: "/visits/operario.webp",
		imageTone: "servicos",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Chegada com antecedência",
			"Demais regras serão confirmadas pela organização",
		],
	},
	{
		category: "Serviços e Outros",
		title: "Smart",
		location: "PR-151 - Ponta Grossa",
		image: "/visits/smart.webp",
		imageTone: "servicos",
		requirementTitle: "Orientações preliminares",
		requirements: [
			"Documento original com foto",
			"Chegada com antecedência",
			"Demais regras serão confirmadas pela organização",
		],
	},
];

const categories = Array.from(new Set(visits.map((visit) => visit.category)));

function normalizeSearch(value: string) {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

function getCategoryId(category: string) {
	return `technical-visits-${normalizeSearch(category).replace(/[^a-z0-9]+/g, "-")}`;
}

function getRestrictions(visit: (typeof visits)[number]) {
	if (visit.title === "Heineken") {
		return [
			"Calçado aberto, shorts ou bermuda",
			"Cabelos soltos em áreas operacionais",
			"Fotografar áreas produtivas sem autorização",
		];
	}

	return restrictionsByCategory[visit.category] ?? [];
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
	const groupedVisits = categories
		.map((category) => ({
			category,
			items: filteredVisits.filter((visit) => visit.category === category),
		}))
		.filter((group) => group.items.length > 0);

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
							Conheça as empresas confirmadas para as visitas técnicas da edição
							2026 em Ponta Grossa. A programação reúne experiências em agro,
							indústria, tecnologia, mentorias e serviços, aproximando os
							participantes de operações reais e diferentes modelos de gestão.
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

					{filteredVisits.length > 0 ? (
						<div className="technical-visits-groups">
							{groupedVisits.map((group) => (
								<section
									className="technical-visits-group"
									key={group.category}
									aria-labelledby={getCategoryId(group.category)}
								>
									<div className="technical-visits-group__heading">
										<h2 id={getCategoryId(group.category)}>{group.category}</h2>
									</div>
									<section
										className="technical-visits-grid"
										aria-label={`Visitas de ${group.category}`}
									>
										{group.items.map((visit) => (
											<TechnicalVisitCard key={visit.title} visit={visit} />
										))}
									</section>
								</section>
							))}
						</div>
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
	const restrictions = getRestrictions(visit);

	return (
		<article className="technical-visit-card">
			<div
				className={`technical-visit-card__image technical-visit-card__image--${visit.imageTone}`}
			>
				{"image" in visit ? (
					<img src={visit.image} alt={visit.title} loading="lazy" />
				) : null}
				<span>{visit.category}</span>
				<Building2 size={42} />
			</div>
			<div className="technical-visit-card__body">
				<h2>{visit.title}</h2>
				<p className="technical-visit-card__location">
					<MapPin size={15} />
					{visit.location}
				</p>
				<div className="technical-visit-card__note">
					<ClipboardCheck size={15} />
					<div>
						<strong>{visit.requirementTitle}</strong>
						<ul>
							{visit.requirements.map((requirement) => (
								<li key={requirement}>{requirement}</li>
							))}
						</ul>
					</div>
				</div>
				<div className="technical-visit-card__note technical-visit-card__note--restriction">
					<Ban size={15} />
					<div>
						<strong>Não permitido</strong>
						<ul>
							{restrictions.map((restriction) => (
								<li key={restriction}>{restriction}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</article>
	);
}
