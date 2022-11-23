import Header from "../components/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { cheerio } from "https://deno.land/x/cheerio@1.0.7/mod.ts";

interface Index
{
  scp_list: Array<object>
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const url = "http://fondationscp.wikidot.com/";
    let scp_list = {};

    const response = await fetch(url);
    if (response.status === 404) {
      return ctx.renderNotFound();
    }

    if (response.status === 200) {
      const html = await (response.text());
      const $ = cheerio.load(html);
      const urlList =  $('.menu-item.series a')
        .map((_i, link) => url + $(link).attr('href').split('/')[1])

          for await (const page of urlList.map((_i, link) => fetch(link))) {
            const $ = cheerio.load(await (page.text()));

            $('div#page-content ul li a')
            .map((_il, l) => {
              const l_scp = $(l).attr('href');
              const l_text = $(l).text();
              if (l_scp !== 'javascript:;') {
                scp_list[l_scp] = l_text;
              }
            });
          }

      return ctx.render({
        scp_list
      });
    }
  }
}

export default function Home({ data }: PageProps<Index>) {
  return (
    <>
    <Header />
    <div class="terminal-glitch"></div>
    <div class="container">
      {Object.keys(data.scp_list).map((link) => (<a href={link}>{data.scp_list[link]}</a>))}
    </div>
    </>
  );
}
