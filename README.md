# kidDo website

Static [Jekyll](https://jekyllrb.com) site, built and served by GitHub Pages straight from this repository (the `CNAME` file sets the domain).

Preview locally with `bundle install && bundle exec jekyll serve` from the repository root.

## Where things live

- `_posts/` - **Log** entries (lab log & news). File name `YYYY-MM-DD-slug.md`. Front matter: `title`, `abstract` (shown in the list), optional `image` (thumbnail in the log list, not shown on the entry page itself), `tags`.
  Entries imported from Hackaday.io carry a `hackaday:` link to the original; their images are in `assets/img/log/`.
- `about.md`, `research.md`, `links.md` - static pages, plain Markdown. Headings, lists etc. are styled by the `.prose` rules in `assets/css/site.css`.
- `notes/` - unpublished drafts (research questions, people, student projects), excluded from the build.
- `demo.*` - the WebAssembly build of the fantasy backend (copy over `demo.js`, `demo.wasm`, `demo.data` to update).

The name kidDo is rendered in the Baloo 2 font automatically by `assets/js/site.js`; in templates use `<span class="kd">kidDo</span>` so it works without JavaScript too.

Image placeholders: `{% include placeholder.html label="what should go here" ratio="4/3" src="/assets/img/device/name.jpg" %}`. The label doubles as alt text; once a file exists at `src`, the real image is shown instead.
