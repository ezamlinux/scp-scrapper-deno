export default function Nav() {
  const page = arguments[0].page;
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">{page}</li>
      </ol>
    </nav>
  );
}