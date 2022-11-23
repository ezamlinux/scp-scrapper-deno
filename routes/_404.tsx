import { UnknownPageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Nav from "../components/Nav.tsx";
export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <>
    <Header />
    <div class="terminal-glitch"></div>
    <div class="container container_error">
      <Nav page="404 NOT FOUND"/>
      <h1>404 NOT FOUND</h1>
    </div>
    </>
  );
}