import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import Nav from "../components/Nav.tsx";
import { cheerio } from "https://deno.land/x/cheerio@1.0.7/mod.ts";

interface Scp {
  title: string;
  page_content: object;
}

export const handler: Handlers<Scp> = {
  async GET(_, ctx) {
    const endpoint = "http://fondationscp.wikidot.com/";
    const scp_number = ctx.params.scp;
    const url = endpoint + scp_number;
    let title = "404"
    let page_content = {
      __html: ''
    };

    const response = await fetch(url);
    if (response.status === 404) {
      return ctx.renderNotFound();
    }

    if (response.status === 200) {
      const html = await (response.text());
      const $ = cheerio.load(html);

      const to_remove = [
          // remove credit block
          '.creditRate',
          // remove footer (pagination) block
          '.footer-wikiwalk-nav',
          // remove balise script
          'script',
      ];

      title = $("#page-title").text().trim();

      $(to_remove.join(', ')).remove();

      $('strong').each((_i, elem) => {
          if ($(elem).text().trim().slice(-1) == ':') {
              $(elem).html($(elem).html().replace(":", ">>"))
          }
      })

      // .invisible class for [style="color:white"]
      $('[style="color:white"], [style="color: white"]').each((_i, elem) => {
          $(elem).removeAttr('style');
          $(elem).addClass('invisible_data');
      });

      $('[onclick]').each((_i, elem) => {
          $(elem).removeAttr('onclick');
      });

      // scp 6030
      $('[style="float: center; border: solid 4px #444444; width: 570px; padding: 1px 15px; margin: 10px 10px 10px 40px; box-shadow: 2px 1px 3px rgba(0,0,0,.2);"]')
        .each((_i, elem) => {
          $(elem).removeAttr('style');
          $(elem).addClass('document_media');
        })

      $('div.yui-navset').each((_i, elem) => {
          let html = '<ul class="nav nav-tabs">';

          $(elem)
            .find('ul li').each((_i, el) => {
              html += '<li>'+ $(el).html() +'</li>';
            });


          html += '</ul>';

        $(elem).html(html);
      });
      // iframe url scp 001

      // scp-3003 tabview -> bootstrap tab

      page_content = {
        __html: $('#page-content').html() ?? ''
      };

      return ctx.render({
        title,
        page_content
      });
    }
  }
}

export default function Page({ data }: PageProps<Scp>) {
  return (
    <>
    <Header />
    <div class="terminal-glitch"></div>
    <div class="container">
      <Nav page={data.title}/>
      <div dangerouslySetInnerHTML={ data.page_content }></div>
    </div>
    </>
  );
}
