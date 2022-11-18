import { Head, asset } from "$fresh/runtime.ts";

export default function Header() {
  return (
    <Head>
      <title>SCP FOUNDATION</title>
      <meta charset="utf-8" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href={ asset("/style.css") } />
      <script src={ asset("/script.js") }></script>
    </Head>
  );
}