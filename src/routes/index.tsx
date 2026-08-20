import { useGSAP } from "@gsap/react";
import { createFileRoute } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	ArrowRight,
	Bed,
	CalendarDays,
	CheckCircle2,
	Handshake,
	Hotel,
	MapPin,
	Route as RouteIcon,
	Ticket,
	Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({ component: Home });

const eventStartAt = new Date("2026-10-16T00:00:00-03:00").getTime();
const signupUrl = "https://app.ciaticket.com.br/e/EPJEPG26";
const slavieroBookingUrl =
	"https://book.omnibees.com/chain/1409/hotel/15710?c=1409&currencyId=16&lang=pt-BR&q=15710";

const schedule = [
	[
		"12:00",
		"Abertura e credenciamento",
		"Recepção dos participantes, abertura oficial e retirada dos materiais.",
	],
	[
		"14:00",
		"Saída para visitas técnicas",
		"Organização dos grupos e saída para as atividades técnicas.",
	],
	[
		"16h",
		"Visita Heineken",
		"Saída 16h para a rota Heineken.",
	],
	[
		"19:00",
		"Happy Hour",
		"Momento de integração e networking após as visitas técnicas.",
	],
];

const quickLinks = [
	{ href: "/visitas-tecnicas", icon: RouteIcon, label: "Visitas" },
	{ href: "/programacao", icon: CalendarDays, label: "Programação" },
	{ href: "/hospedagem", icon: Bed, label: "Hospedagem" },
	// Locais fica oculto até a confirmação final dos pontos do evento.
	// { href: "/locais", icon: MapPin, label: "Locais" },
	{ href: signupUrl, icon: Ticket, label: "Inscrição", external: true },
	{ href: "/patrocinadores", icon: Handshake, label: "Patrocinadores" },
];

const sponsorLogos = [
	{
		id: "inbix",
		name: "Inbix",
		src: "/sponsors/logos/inbix.webp",
		variant: "wide",
	},
	{
		id: "cia-ticket",
		name: "Cia Ticket",
		src: "/sponsors/logos/cia-ticket.webp",
		variant: "wide",
	},
	{
		id: "slaviero",
		name: "Slaviero",
		src: "/sponsors/logos/slaviero.webp",
		variant: "wide",
	},
	{
		id: "smart",
		name: "Smart",
		src: "/sponsors/logos/smart.webp",
		variant: "wide",
	},
	{
		id: "dbug",
		name: "DBUG",
		src: "/sponsors/logos/dbug.webp",
		variant: "tall",
	},
	{
		id: "ruivo",
		name: "Ruivo Fotografia",
		src: "/sponsors/logos/ruivo.webp",
		variant: "square",
	},
	{
		id: "box-video",
		name: "Box Vídeo",
		src: "/sponsors/logos/box-video.webp",
		variant: "box",
	},
	{
		id: "mich",
		name: "Mich",
		src: "/sponsors/logos/mich.webp",
		variant: "wide",
	},
	{
		id: "rogerio-junior",
		name: "Rogério Junior",
		src: "/sponsors/logos/rogerio-junior.webp",
		variant: "tall",
	},
	{
		id: "kaiser-tech",
		name: "Kaiser Tech",
		src: "/sponsors/logos/kaiser-tech.webp",
		variant: "square",
	},
	{
		id: "win-target",
		name: "Win Target",
		src: "/sponsors/logos/win-target.webp",
		variant: "tall",
	},
	{
		id: "brigatta",
		name: "Brigatta",
		src: "/sponsors/logos/brigatta.webp",
		variant: "wide",
	},
	{
		id: "cacicpar",
		name: "CACICPAR",
		src: "/sponsors/logos/cacicpar.webp",
		variant: "wide",
	},
	{
		id: "dbl-turismo",
		name: "DBL Turismo",
		src: "/sponsors/logos/dbl-turismo.webp",
		variant: "wide",
	},
	{
		id: "thanile-ratti",
		name: "Thanile Ratti",
		src: "/sponsors/logos/thani-ratti.webp",
		variant: "wide",
	},
	{
		id: "pega-essa-ideia",
		name: "Pega Essa Ideia",
		src: "/sponsors/logos/pega-essa-ideia.webp",
		variant: "square",
	},
	{
		id: "fernanda-suguiama",
		name: "Fernanda Suguiama",
		src: "/sponsors/logos/fernanda-suguiama.webp",
		variant: "wide",
	},
	{
		id: "eletroluz",
		name: "Eletroluz",
		src: "/sponsors/logos/eletroluz.webp",
		variant: "wide",
	},
	{
		id: "coupleads",
		name: "CoupleAds",
		src: "/sponsors/logos/coupleads.webp",
		variant: "wide",
	},
	{
		id: "malui",
		name: "Maluí",
		src: "/sponsors/logos/malui.webp",
		variant: "wide",
	},
	{
		id: "deca-festas",
		name: "Deca Eventos",
		src: "/sponsors/logos/deca-festas.webp",
		variant: "wide",
	},
];

function getCountdownItems() {
	const totalSeconds = Math.max(
		0,
		Math.floor((eventStartAt - Date.now()) / 1000),
	);
	const days = Math.floor(totalSeconds / 86_400);
	const hours = Math.floor((totalSeconds % 86_400) / 3_600);
	const minutes = Math.floor((totalSeconds % 3_600) / 60);
	const seconds = totalSeconds % 60;

	return [
		[String(days).padStart(2, "0"), "dias"],
		[String(hours).padStart(2, "0"), "horas"],
		[String(minutes).padStart(2, "0"), "minutos"],
		[String(seconds).padStart(2, "0"), "segundos"],
	];
}

function Home() {
	const pageRef = useRef<HTMLDivElement>(null);
	const [countdown, setCountdown] = useState(getCountdownItems);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setCountdown(getCountdownItems());
		}, 1000);

		return () => window.clearInterval(interval);
	}, []);

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
						".event-sponsors",
						".event-section__heading",
						".event-timeline li",
						".schedule-layout__media",
						".official-hotel",
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

			revealGroup(".event-sponsors", ".event-sponsors__inner", {
				y: 28,
				scale: 0.98,
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
							<h1>Venha viver experiências marcantes em Ponta&nbsp;Grossa</h1>
							<p>
								<strong>16 e 17 de outubro de 2026.</strong>{" "}
								Uma imersão técnica exclusiva nas maiores referências
								industriais e agrícolas do Paraná. Conhecimento prático,
								networking de alto nível e inovação.
							</p>
							<div className="event-actions">
								<a
									className="event-button event-button--highlight"
									href={signupUrl}
									target="_blank"
									rel="noopener"
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
							<div className="event-hero-image">
								<video
									controls
									preload="metadata"
									poster="/media/epje-video-poster.jpg"
									aria-label="Vídeo do EPJE em Ponta Grossa"
								>
									<source src="/media/epje-video.webm" type="video/webm" />
									<source src="/media/epje-video.mp4" type="video/mp4" />
									Seu navegador não suporta a reprodução deste vídeo.
								</video>
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
						{quickLinks.map(({ href, icon: Icon, label, external }) => (
							<a
								href={href}
								className="event-quicklink"
								target={external ? "_blank" : undefined}
								rel={external ? "noopener" : undefined}
								key={label}
							>
								<Icon size={18} />
								<span>{label}</span>
							</a>
						))}
					</div>
				</section>

				<section className="event-sponsors" aria-label="Patrocinadores">
					<div className="event-container event-sponsors__inner">
						<div className="event-sponsors__heading">
							<span>Patrocinadores</span>
							<strong>Marcas que apoiam esta experiência</strong>
						</div>
						<div className="event-sponsors__marquee">
							<div className="event-sponsors__track">
								{[0, 1, 2, 3].map((groupIndex) => (
									<div
										className="event-sponsors__group"
										aria-hidden={groupIndex > 0 ? "true" : undefined}
										key={`sponsor-group-${groupIndex}`}
									>
										{sponsorLogos.map((sponsor) => (
											<div
												className={[
													"event-sponsor-logo",
													`event-sponsor-logo--${sponsor.variant}`,
													`event-sponsor-logo--${sponsor.id}`,
												]
													.filter(Boolean)
													.join(" ")}
												key={`${sponsor.id}-${groupIndex}`}
											>
												<img src={sponsor.src} alt={sponsor.name} loading="lazy" />
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Seção de visitas técnicas em destaque temporariamente oculta. */}

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
							<div className="schedule-media-card">
								<img
									src="/acipg-hero.webp"
									alt="Sede da ACIPG em Ponta Grossa"
									loading="lazy"
								/>
								<span>ACIPG</span>
							</div>
						</div>
					</div>
				</section>

				<section className="event-section" id="hospedagem">
					<div className="event-container">
						<div className="event-section__heading">
							<div>
								<h2>Hospedagem em Ponta Grossa</h2>
								<p>Selecionamos uma opção oficial para sua estadia.</p>
							</div>
							<a href="/hospedagem">
								Ver todos <ArrowRight size={14} />
							</a>
						</div>
						<div className="lodging-layout">
							<article className="official-hotel">
								<div className="official-hotel__image">
									<img
										src="/sponsors/slaviero-ponta-grossa.webp"
										alt="Fachada do Slaviero Ponta Grossa"
										loading="lazy"
									/>
								</div>
								<div className="official-hotel__content">
									<span className="event-pill event-pill--highlight">
										<Hotel size={14} /> Hotel Oficial
									</span>
									<h3>Slaviero Ponta Grossa</h3>
									<ul>
										<li>
											<MapPin size={14} /> Av. Flex, 376 - Colônia Dona Luíza,
											Ponta Grossa - PR
										</li>
										<li>
											<CheckCircle2 size={14} /> Local oficial de realização da
											AGO no sábado
										</li>
										<li>
											<CheckCircle2 size={14} /> Café da manhã, estacionamento e
											Wi-Fi inclusos
										</li>
										<li>
											<CheckCircle2 size={14} /> Cupom de desconto: EPJE15
										</li>
										<li>
											<CheckCircle2 size={14} /> Condições especiais para grupos a
											partir de 15 quartos. Falar com Cassiano: (42) 99124-9720
										</li>
									</ul>
									<a
										className="event-button event-button--primary"
										href={slavieroBookingUrl}
										target="_blank"
										rel="noreferrer"
									>
										Reservar
									</a>
								</div>
							</article>
						</div>
					</div>
				</section>

				<section className="event-final-cta" id="inscricao">
					<div className="event-container">
						<div className="event-final-cta__panel">
							<h2>Não perca a chance de transformar sua visão técnica</h2>
							<p>
								Participe de uma experiência com visitas técnicas, programação
								estratégica e conexões com empresas confirmadas em Ponta Grossa.
							</p>
							<a
								className="event-button event-button--highlight event-final-cta__button"
								href={signupUrl}
								target="_blank"
								rel="noopener"
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
