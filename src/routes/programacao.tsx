import { createFileRoute } from "@tanstack/react-router";
import {
	BriefcaseBusiness,
	Clock3,
	MapPin,
	ShieldCheck,
	Utensils,
} from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/programacao")({
	component: SchedulePage,
});

const scheduleDays = [
	{
		id: "dia-1",
		label: "Dia 1 - 24/Out",
		shortLabel: "Dia 1",
		ctaTitle: "Garanta sua vaga no Dia 1",
		ctaDescription:
			"As vagas para a visita técnica da Heineken são limitadas a 40 participantes por questões de segurança industrial.",
		events: [
			{
				time: "08:00",
				track: "Credenciamento",
				category: "Logística",
				title: "Recepção e Entrega de Kits",
				location: "Centro de Convenções UP",
				host: "Coordenação Visita",
				role: "Equipe Organizadora",
				variant: "standard",
				icon: Clock3,
			},
			{
				time: "09:30",
				track: "Visita Técnica",
				category: "Visita Industrial",
				title: "Cervejaria Heineken - Linha de Envase 4.0",
				location: "Distrito Industrial Norte",
				host: "Eng. Marcos Oliveira",
				role: "Gerente de Automação",
				description:
					"Apresentação do ecossistema de IIoT aplicado ao controle de qualidade e logística interna de uma das maiores plantas da América Latina.",
				tags: ["Equipamentos de Proteção", "Certificado 2h"],
				variant: "featured",
				icon: ShieldCheck,
			},
			{
				time: "12:30",
				track: "Networking",
				category: "Intervalo",
				title: "Almoço Livre e Networking",
				location: "Área Gourmet Shopping Palladium",
				variant: "break",
				icon: Utensils,
			},
			{
				time: "14:30",
				track: "Visita Técnica",
				category: "Agroindústria",
				title: "Unium - Unidade de Lácteos",
				location: "Castro - PR",
				host: "Equipe Técnica Unium",
				role: "Operações Industriais",
				description:
					"Roteiro guiado pelos processos de produção, qualidade e armazenamento da cadeia de lácteos.",
				tags: ["Saída em ônibus oficial", "EPI obrigatório"],
				variant: "featured",
				icon: BriefcaseBusiness,
			},
		],
	},
	{
		id: "dia-2",
		label: "Dia 2 - 25/Out",
		shortLabel: "Dia 2",
		ctaTitle: "Garanta sua vaga no Dia 2",
		ctaDescription:
			"O segundo dia reúne rotas industriais e logísticas com grupos reduzidos para favorecer acompanhamento técnico e perguntas em campo.",
		events: [
			{
				time: "08:30",
				track: "Embarque",
				category: "Logística",
				title: "Saída dos ônibus oficiais",
				location: "Hotel oficial - área de embarque",
				host: "Coordenação Visita",
				role: "Equipe Organizadora",
				variant: "standard",
				icon: Clock3,
			},
			{
				time: "09:15",
				track: "Visita Técnica",
				category: "Manufatura",
				title: "BO Paper - Processo de Manufatura Contínua",
				location: "Rodovia PR-151, Arapoti - PR",
				host: "Eng. Renata Almeida",
				role: "Supervisora de Produção",
				description:
					"Imersão na operação de papel, controle de segurança industrial, rastreabilidade e indicadores de eficiência produtiva.",
				tags: ["Termo de responsabilidade", "Fotografia restrita"],
				variant: "featured",
				icon: ShieldCheck,
			},
			{
				time: "12:45",
				track: "Intervalo",
				category: "Intervalo",
				title: "Almoço Técnico",
				location: "Restaurante conveniado",
				variant: "break",
				icon: Utensils,
			},
			{
				time: "15:00",
				track: "Visita Técnica",
				category: "Tecnologia",
				title: "Águia Sistemas - Automação Industrial",
				location: "Avenida União Pan-Americana, 500",
				host: "Time de Engenharia Águia",
				role: "Pesquisa e Desenvolvimento",
				description:
					"Demonstração de soluções para linhas produtivas, integração de dados e gestão operacional em ambientes industriais.",
				tags: ["Demonstração prática", "Certificado 2h"],
				variant: "featured",
				icon: BriefcaseBusiness,
			},
		],
	},
];

function SchedulePage() {
	const [selectedDayId, setSelectedDayId] = useState(scheduleDays[0].id);
	const selectedDay =
		scheduleDays.find((day) => day.id === selectedDayId) ?? scheduleDays[0];

	return (
		<div className="schedule-page">
			<Header active="programacao" className="schedule-header" />

			<main className="schedule-main">
				<div className="event-container">
					<nav className="schedule-breadcrumb" aria-label="Caminho">
						<a href="/">Início</a>
						<span>/</span>
						<span>Programação Completa</span>
					</nav>

					<section className="schedule-intro">
						<h1>Programação Completa</h1>
						<p>
							Confira o cronograma detalhado de dois dias de imersão técnica,
							networking e conhecimento nas principais plantas industriais de
							Ponta Grossa.
						</p>
					</section>

					<div
						className="schedule-tabs"
						role="tablist"
						aria-label="Dias do evento"
					>
						{scheduleDays.map((day) => (
							<button
								type="button"
								role="tab"
								aria-selected={selectedDay.id === day.id}
								className={selectedDay.id === day.id ? "is-active" : undefined}
								key={day.id}
								onClick={() => setSelectedDayId(day.id)}
							>
								<span>{day.label}</span>
								<small>{day.shortLabel}</small>
							</button>
						))}
					</div>

					<section className="schedule-timeline" aria-label={selectedDay.label}>
						{selectedDay.events.map((event) => (
							<ScheduleEventCard
								event={event}
								key={`${event.time}-${event.title}`}
							/>
						))}
					</section>

					<section className="schedule-cta">
						<h2>{selectedDay.ctaTitle}</h2>
						<p>{selectedDay.ctaDescription}</p>
						<a href="/#inscricao">Inscrever-se Agora</a>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
}

function ScheduleEventCard({
	event,
}: {
	event: (typeof scheduleDays)[number]["events"][number];
}) {
	const Icon = event.icon;

	return (
		<article className={`schedule-event schedule-event--${event.variant}`}>
			<div className="schedule-event__time">
				<strong>{event.time}</strong>
				<span>{event.track}</span>
			</div>
			<div className="schedule-event__card">
				<span className="schedule-event__dot" aria-hidden="true" />
				<div className="schedule-event__content">
					<div className="schedule-event__main">
						<span className="schedule-event__badge">{event.category}</span>
						<h2>{event.title}</h2>
						<p className="schedule-event__location">
							{event.variant === "break" ? (
								<Icon size={17} />
							) : (
								<MapPin size={17} />
							)}
							{event.location}
						</p>
						{event.description ? (
							<p className="schedule-event__description">{event.description}</p>
						) : null}
						{event.tags ? (
							<div className="schedule-event__tags">
								{event.tags.map((tag) => (
									<span key={tag}>{tag}</span>
								))}
							</div>
						) : null}
					</div>
					{event.host ? (
						<aside className="schedule-event__host">
							<strong>{event.host}</strong>
							<span>{event.role}</span>
						</aside>
					) : null}
				</div>
			</div>
		</article>
	);
}
