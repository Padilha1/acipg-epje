import { TanStackDevtools } from "@tanstack/react-devtools";
import { Link, createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
});

function RootComponent() {
	return (
		<>
			<Outlet />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	);
}

function NotFoundComponent() {
	return (
		<div className="event-home">
			<Header active="inicio" />
			<main className="not-found-page">
				<section className="event-container not-found-page__content">
					<span>404</span>
					<h1>Página não encontrada</h1>
					<p>
						O endereço acessado não existe ou foi movido. Volte para a página
						inicial para continuar navegando pelo evento.
					</p>
					<Link className="event-button event-button--primary" to="/">
						Voltar para o início
					</Link>
				</section>
			</main>
			<Footer />
		</div>
	);
}
