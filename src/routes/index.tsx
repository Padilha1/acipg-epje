import { useGSAP } from "@gsap/react";
import { createFileRoute } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	ArrowRight,
	Bed,
	Building2,
	CalendarDays,
	Camera,
	CheckCircle2,
	Clock3,
	Hotel,
	MapPin,
	Route as RouteIcon,
	Sparkles,
	Ticket,
	Users,
} from "lucide-react";
import { useRef } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({ component: Home });

const visits = [
	{
		category: "Indústria de alimentos",
		title: "Processamento Avançado",
		description:
			"Visite focos em automação de linha e controle de qualidade agroindustrial.",
		time: "24 out. - 09:00",
	},
	{
		category: "Madeira e papel",
		title: "Hub de Inovação PG",
		description:
			"Explore laboratórios que conectam tecnologia, pesquisa e desenvolvimento.",
		time: "25 out. - 14:00",
	},
	{
		category: "Cooperativa agrícola",
		title: "Logística de Safra",
		description: "Veja operações de armazenamento e fluxo logístico no campo.",
		time: "25 out. - 08:30",
	},
];

const schedule = [
	[
		"08:00 - 09:00",
		"Credenciamento e Welcome Coffee",
		"Recepção dos participantes no hotel oficial e entrega dos kits.",
	],
	[
		"09:30 - 12:00",
		"Visita Técnica 01: Indústria Local",
		"Saída em transporte executivo para a primeira planta industrial.",
	],
	[
		"12:30 - 14:00",
		"Almoço de Networking",
		"Momento livre para integração entre profissionais e palestrantes.",
	],
	[
		"14:30 - 17:30",
		"Visita Técnica 02: Centro de Pesquisa",
		"Imersão em laboratórios de biotecnologia e inovação de campo.",
	],
];

const quickLinks = [
	{ href: "#visitas", icon: RouteIcon, label: "Visitas" },
	{ href: "/programacao", icon: CalendarDays, label: "Programação" },
	{ href: "/hospedagem", icon: Bed, label: "Hospedagem" },
	{ href: "/locais", icon: MapPin, label: "Locais" },
	{ href: "#inscricao", icon: Ticket, label: "Inscrição" },
	{ href: "/fotos", icon: Camera, label: "Fotos" },
];

const countdown = [
	["24", "dias"],
	["12", "horas"],
	["45", "minutos"],
	["08", "segundos"],
];

function Home() {
	const pageRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (reduceMotion) {
				gsap.set(
					[
						"[data-home-reveal]",
						".event-countdown__grid",
						".event-countdown__item",
						".event-quicklink",
						".event-section__heading",
						".visit-card",
						".event-timeline li",
						".schedule-layout__media",
						".official-hotel",
						".hotel-mini",
						".event-final-cta__panel",
					],
					{ clearProps: "all" },
				);
				return;
			}

			gsap.from(".event-hero [data-home-reveal]", {
				y: 18,
				opacity: 0,
				duration: 0.75,
				ease: "power2.out",
				stagger: 0.08,
			});

			const revealGroup = (
				trigger: string,
				targets: string,
				vars: gsap.TweenVars,
				stagger = 0.08,
			) => {
				gsap.from(targets, {
					...vars,
					opacity: 0,
					duration: vars.duration ?? 0.75,
					ease: vars.ease ?? "power3.out",
					stagger,
					scrollTrigger: {
						trigger,
						start: "top 78%",
						once: true,
					},
				});
			};

			revealGroup(".event-countdown", ".event-countdown__grid", {
				y: 28,
				scale: 0.98,
			});

			revealGroup(".event-countdown", ".event-countdown__item", {
				y: 18,
				scale: 0.92,
				duration: 0.58,
				ease: "back.out(1.7)",
			});

			revealGroup(".event-quicklinks", ".event-quicklink", {
				y: 24,
				rotateX: -12,
				transformOrigin: "50% 100%",
				duration: 0.68,
			});

			revealGroup("#visitas", "#visitas .event-section__heading", {
				y: 28,
			});

			revealGroup("#visitas", ".visit-card", {
				y: 42,
				rotate: -1.5,
				scale: 0.96,
				duration: 0.72,
			});

			revealGroup("#programacao", "#programacao .event-section__heading", {
				x: -28,
			});

			revealGroup("#programacao", ".event-timeline li", {
				x: -34,
				duration: 0.62,
			});

			revealGroup("#programacao", ".schedule-layout__media", {
				x: 42,
				scale: 0.96,
				duration: 0.82,
			});

			revealGroup("#hospedagem", "#hospedagem .event-section__heading", {
				y: 26,
			});

			revealGroup("#hospedagem", ".official-hotel", {
				y: 38,
				scale: 0.97,
				duration: 0.82,
			});

			revealGroup("#hospedagem", ".hotel-mini", {
				x: 30,
				duration: 0.58,
			});

			gsap.from(".event-final-cta__panel", {
				y: 34,
				scale: 0.96,
				opacity: 0,
				duration: 0.85,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".event-final-cta",
					start: "top 78%",
					once: true,
				},
			});
		},
		{ scope: pageRef },
	);

	return (
		<div className="event-home" ref={pageRef}>
			<Header active="inicio" />

			<main>
				<section className="event-hero" id="inicio">
					<div className="event-container event-hero__grid">
						<div className="event-hero__content" data-home-reveal>
							<span className="event-pill">
								Ponta Grossa, PR - 24 a 26 de outubro, 2026
							</span>
							<h1>
								Tudo o que você precisa para viver essa experiência em Ponta
								Grossa
							</h1>
							<p>
								Uma imersão técnica exclusiva nas maiores referências
								industriais e agrícolas do Paraná. Conhecimento prático,
								networking de alto nível e inovação.
							</p>
							<div className="event-actions">
								<a
									className="event-button event-button--highlight"
									href="#inscricao"
								>
									Fazer inscrição
								</a>
								<a
									className="event-button event-button--outline"
									href="/programacao"
								>
									Ver programação
								</a>
							</div>
						</div>
						<div className="event-hero__media" data-home-reveal>
							<div className="image-placeholder image-placeholder--hero">
								<Building2 size={42} />
								<span>Imagem principal do evento</span>
							</div>
							<div className="event-attendees">
								<Users size={18} />
								<div>
									<strong>500+</strong>
									<span>Participantes esperados</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="event-countdown" aria-label="Contador regressivo">
					<div className="event-container event-countdown__grid">
						<div>
							<strong>Prepare-se: faltam poucos dias</strong>
							<span>Nosso encontro técnico está chegando!</span>
						</div>
						<div className="event-countdown__items">
							{countdown.map(([value, label]) => (
								<div className="event-countdown__item" key={label}>
									<strong>{value}</strong>
									<span>{label}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="event-quicklinks" aria-label="Acessos rápidos">
					<div className="event-container event-quicklinks__grid">
						{quickLinks.map(({ href, icon: Icon, label }) => (
							<a href={href} className="event-quicklink" key={label}>
								<Icon size={18} />
								<span>{label}</span>
							</a>
						))}
					</div>
				</section>

				<section className="event-section" id="visitas">
					<div className="event-container">
						<div className="event-section__heading">
							<div>
								<h2>Visitas Técnicas em Destaque</h2>
								<p>Conheça alguns dos roteiros confirmados para esta edição.</p>
							</div>
							<a href="/visitas-tecnicas">
								Ver todas <ArrowRight size={14} />
							</a>
						</div>
						<div className="visit-grid">
							{visits.map((visit) => (
								<article
									className="visit-card"
									key={visit.title}
									data-home-reveal
								>
									<div className="image-placeholder visit-card__image">
										<span>{visit.category}</span>
									</div>
									<div className="visit-card__body">
										<span className="visit-card__time">
											<Clock3 size={13} /> {visit.time}
										</span>
										<h3>{visit.title}</h3>
										<p>{visit.description}</p>
										<a href="#visitas">Detalhes da visita</a>
									</div>
								</article>
							))}
						</div>
					</div>
				</section>

				<section className="event-section event-section--soft" id="programacao">
					<div className="event-container schedule-layout">
						<div>
							<div className="event-section__heading event-section__heading--stacked">
								<h2>Agenda do Primeiro Dia</h2>
								<p>
									Confira o cronograma inicial e prepare-se para um dia intenso
									de aprendizado e conexões estratégicas.
								</p>
							</div>
							<ol className="event-timeline">
								{schedule.map(([time, title, description]) => (
									<li key={title}>
										<span>{time}</span>
										<strong>{title}</strong>
										<p>{description}</p>
									</li>
								))}
							</ol>
							<a
								className="event-button event-button--primary"
								href="/programacao"
							>
								Ver programação completa
							</a>
						</div>
						<div className="schedule-layout__media" data-home-reveal>
							<div className="image-placeholder image-placeholder--tall">
								<Sparkles size={38} />
								<span>Imagem da visita técnica</span>
							</div>
						</div>
					</div>
				</section>

				<section className="event-section" id="hospedagem">
					<div className="event-container">
						<div className="event-section__heading event-section__heading--stacked">
							<h2>Hospedagem em Ponta Grossa</h2>
							<p>Selecionamos as melhores opções para sua estadia.</p>
						</div>
						<div className="lodging-layout">
							<article className="official-hotel">
								<div className="image-placeholder official-hotel__image">
									<span>Hotel Oficial</span>
								</div>
								<div className="official-hotel__content">
									<span className="event-pill event-pill--highlight">
										<Hotel size={14} /> Hotel Oficial
									</span>
									<h3>Grande Hotel Premium</h3>
									<ul>
										<li>
											<MapPin size={14} /> Av. Central, 1200 - Centro, Ponta
											Grossa
										</li>
										<li>
											<CheckCircle2 size={14} /> Café da manhã incluso
										</li>
										<li>
											<CheckCircle2 size={14} /> Transfer para as visitas
											técnicas
										</li>
										<li>
											<CheckCircle2 size={14} /> Tarifa especial para inscritos
										</li>
									</ul>
									<a
										className="event-button event-button--primary"
										href="#hospedagem"
									>
										Reservar
									</a>
								</div>
							</article>
							<aside className="hotel-list" aria-label="Outras recomendações">
								<span>Outras recomendações</span>
								{[
									"Hotel Business Class",
									"Executive Stay PG",
									"Plaza Suites",
								].map((hotel, index) => (
									<a className="hotel-mini" href="#hospedagem" key={hotel}>
										<div className="image-placeholder hotel-mini__image">
											{index + 1}
										</div>
										<div>
											<strong>{hotel}</strong>
											<small>
												R$ {index === 0 ? "240" : index === 1 ? "310" : "330"}
												/noite
											</small>
										</div>
									</a>
								))}
							</aside>
						</div>
					</div>
				</section>

				<section className="event-final-cta" id="inscricao">
					<div className="event-container">
						<div className="event-final-cta__panel">
							<h2>Não perca a chance de transformar sua visão técnica</h2>
							<p>
								As vagas são limitadas para garantir a qualidade de todas as
								visitas e interações. Garanta seu lugar agora mesmo!
							</p>
							<a
								className="event-button event-button--highlight event-final-cta__button"
								href="https://example.com"
								target="_blank"
								rel="noreferrer"
							>
								Fazer minha inscrição agora
							</a>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
