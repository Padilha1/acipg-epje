import { createFileRoute } from "@tanstack/react-router";
import {
	Bed,
	BriefcaseBusiness,
	Building2,
	CalendarDays,
	Clock3,
	type LucideIcon,
	MapPin,
	PartyPopper,
	Route as RouteIcon,
	Utensils,
} from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createFileRoute("/programacao")({
	component: SchedulePage,
});

const signupUrl = "https://app.ciaticket.com.br/e/EPJEPG26";

type ScheduleEvent = {
	time: string;
	track: string;
	category: string;
	title: string;
	location: string;
	href?: string;
	host?: string;
	role?: string;
	description?: string;
	tags?: string[];
	variant: "standard" | "featured" | "break";
	icon: LucideIcon;
};

type ScheduleDay = {
	id: string;
	label: string;
	shortLabel: string;
	ctaTitle: string;
	ctaDescription: string;
	events: ScheduleEvent[];
};

const scheduleQuickLinks = [
	{ href: "/visitas-tecnicas", icon: RouteIcon, label: "Visitas Técnicas" },
	{ href: "/hospedagem", icon: Bed, label: "Hotel Slaviero" },
	{ href: "#agenda", icon: CalendarDays, label: "Agenda" },
	{
		href: "https://www.google.com/maps/search/?api=1&query=ACIPG%20Ponta%20Grossa",
		icon: Building2,
		label: "ACIPG",
		external: true,
	},
];

const scheduleDays: ScheduleDay[] = [
	{
		id: "dia-1",
		label: "Dia 1 - 16/Out",
		shortLabel: "Dia 1",
		ctaTitle: "Confira a programação do Dia 1",
		ctaDescription:
			"O primeiro dia reúne credenciamento, visitas técnicas no período da tarde e integração no happy hour.",
		events: [
			{
				time: "12:00",
				track: "Credenciamento",
				category: "Abertura",
				title: "Abertura e credenciamento",
				location: "ACIPG",
				description:
					"Recepção dos participantes, abertura oficial e retirada dos materiais.",
				variant: "standard",
				icon: Clock3,
			},
			{
				time: "14:00",
				track: "Visitas Técnicas",
				category: "Rotas Técnicas",
				title: "Saída para visitas técnicas",
				location: "ACIPG",
				href: "/visitas-tecnicas",
				description:
					"Organização dos grupos e saída para as atividades técnicas.",
				variant: "featured",
				icon: RouteIcon,
			},
			{
				time: "19:00",
				track: "Happy Hour",
				category: "Networking",
				title: "Happy Hour - Festa a Fantasia",
				location: "Local: Sol de Verão",
				description: "Com direto à concurso e premiação de melhor fantasia!",
				variant: "break",
				icon: PartyPopper,
			},
		],
	},
	{
		id: "dia-2",
		label: "Dia 2 - 17/Out",
		shortLabel: "Dia 2",
		ctaTitle: "Confira a programação do Dia 2",
		ctaDescription:
			"O segundo dia concentra a reunião oficial, almoço e a final do JOJEPs em Vila Velha.",
		events: [
			{
				time: "08:30",
				track: "AGO",
				category: "Reunião Oficial",
				title: "ASSEMBLEIA GERAL ORDINÁRIA",
				location: "Hotel Slaviero (Oficial)",
				description:
					"Momento com palestra Magna, networking, associativismo na prática e repasses da federação.",
				variant: "featured",
				icon: Clock3,
			},
			{
				time: "13:00",
				track: "Intervalo",
				category: "Networking e comida",
				title: "Almoço",
				location: "Hotel Slaviero (Oficial)",
				variant: "break",
				icon: Utensils,
			},
			{
				time: "15:00",
				track: "JOJEPs",
				category: "Encerramento",
				title: "PÓS EVENTO - FINAL DO JOJEPS",
				location: "Parque Estadual de Vila Velha",
				description:
					"Após a finalização do EPJE, a FACIAP Jovem se reúne no parque para a final dos Jogos dos Jovens Empreendedores do Paraná!",
				variant: "standard",
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

					<section className="schedule-quicklinks" aria-label="Acessos da programação">
						{scheduleQuickLinks.map(
							({ href, icon: Icon, label, external }) => (
								<a
									className="schedule-quicklink"
									href={href}
									key={label}
									target={external ? "_blank" : undefined}
									rel={external ? "noopener" : undefined}
								>
									<Icon size={18} />
									<span>{label}</span>
								</a>
							),
						)}
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

					<section
						className="schedule-timeline"
						id="agenda"
						aria-label={selectedDay.label}
					>
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
						<a href={signupUrl} target="_blank" rel="noopener">
							Inscrever-se Agora
						</a>
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
	event: ScheduleEvent;
}) {
	const Icon = event.icon;
	const CardTag = event.href ? "a" : "div";

	return (
		<article className={`schedule-event schedule-event--${event.variant}`}>
			<div className="schedule-event__time">
				<strong>{event.time}</strong>
				<span>{event.track}</span>
			</div>
			<CardTag className="schedule-event__card" href={event.href}>
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
			</CardTag>
		</article>
	);
}
