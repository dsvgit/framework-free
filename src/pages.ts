import { render } from "./render.ts";

export const HomePage = () => {
  return render`
    <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
      <div class="col-md-6 p-lg-5 mx-auto my-5">
        <h1 class="display-3 fw-bold">🌋<br /> Framework Free</h1>
        <h3 class="fw-normal text-muted mb-3">This website is built without any framework</h3>
      </div>
    </div>
  `;
};

export const AboutPage = () => {
  return render`
    <h2>This website code:</h2>
    ${render([
      '<pre style="font-family:monospace;color: rgb(68, 68, 68); background-color: rgb(243, 243, 243); font-weight: 400; "><span style="color: rgb(68, 68, 68); font-weight: 700;">import</span> { <span style="color: rgb(136, 0, 0); font-weight: 700;">BehaviorSubject</span>, map } <span style="color: rgb(68, 68, 68); font-weight: 700;">from</span> <span style="color: rgb(136, 0, 0); font-weight: 400;">"rxjs"</span>;\n' +
        "\n" +
        '<span style="color: rgb(68, 68, 68); font-weight: 700;">import</span> { <span style="color: rgb(136, 0, 0); font-weight: 700;">If</span>, render } <span style="color: rgb(68, 68, 68); font-weight: 700;">from</span> <span style="color: rgb(136, 0, 0); font-weight: 400;">"./render"</span>;\n' +
        '<span style="color: rgb(68, 68, 68); font-weight: 700;">import</span> { <span style="color: rgb(136, 0, 0); font-weight: 700;">AboutPage</span>, <span style="color: rgb(136, 0, 0); font-weight: 700;">ContactsPage</span>, <span style="color: rgb(136, 0, 0); font-weight: 700;">HomePage</span> } <span style="color: rgb(68, 68, 68); font-weight: 700;">from</span> <span style="color: rgb(136, 0, 0); font-weight: 400;">"./pages.ts"</span>;\n' +
        '<span style="color: rgb(68, 68, 68); font-weight: 700;">import</span> { <span style="color: rgb(136, 0, 0); font-weight: 700;">NavLink</span> } <span style="color: rgb(68, 68, 68); font-weight: 700;">from</span> <span style="color: rgb(136, 0, 0); font-weight: 400;">"./nav.ts"</span>;\n' +
        "\n" +
        '<span style="color: rgb(68, 68, 68); font-weight: 700;">const</span> <span style="color: rgb(136, 0, 0); font-weight: 700;">App</span> = (<span style="color: rgb(68, 68, 68); font-weight: 400;"></span>) =&gt; {\n' +
        '  <span style="color: rgb(68, 68, 68); font-weight: 700;">const</span> currentTab$ = <span style="color: rgb(68, 68, 68); font-weight: 700;">new</span> <span style="color: rgb(136, 0, 0); font-weight: 700;">BehaviorSubject</span>(\n' +
        '    location.<span style="color: rgb(68, 68, 68); font-weight: 400;">hash</span>.<span style="color: rgb(136, 0, 0); font-weight: 700;">replace</span>(<span style="color: rgb(136, 0, 0); font-weight: 400;">"#"</span>, <span style="color: rgb(136, 0, 0); font-weight: 400;">""</span>) || <span style="color: rgb(136, 0, 0); font-weight: 400;">"home"</span>,\n' +
        "  );\n" +
        '  <span style="color: rgb(68, 68, 68); font-weight: 700;">const</span> <span style="color: rgb(136, 0, 0); font-weight: 700;">isTabActive$</span> = (<span style="color: rgb(68, 68, 68); font-weight: 400;">tab: <span style="color: rgb(57, 115, 0); font-weight: 400;">string</span></span>) =&gt;\n' +
        '    currentTab$.<span style="color: rgb(136, 0, 0); font-weight: 700;">pipe</span>(<span style="color: rgb(136, 0, 0); font-weight: 700;">map</span>(<span style="color: rgb(68, 68, 68); font-weight: 400;">(<span style="color: rgb(68, 68, 68); font-weight: 400;">value</span>) =&gt;</span> value === tab));\n' +
        "\n" +
        '  <span style="color: rgb(68, 68, 68); font-weight: 700;">const</span> <span style="color: rgb(136, 0, 0); font-weight: 700;">handleClick</span> = (<span style="color: rgb(68, 68, 68); font-weight: 400;">e: MouseEvent</span>) =&gt; {\n' +
        '    <span style="color: rgb(68, 68, 68); font-weight: 700;">const</span> target = e.<span style="color: rgb(68, 68, 68); font-weight: 400;">target</span> <span style="color: rgb(68, 68, 68); font-weight: 700;">as</span> <span style="color: rgb(136, 0, 0); font-weight: 700;">HTMLElement</span>;\n' +
        '    <span style="color: rgb(68, 68, 68); font-weight: 700;">const</span> href = target.<span style="color: rgb(136, 0, 0); font-weight: 700;">getAttribute</span>(<span style="color: rgb(136, 0, 0); font-weight: 400;">"href"</span>)!.<span style="color: rgb(136, 0, 0); font-weight: 700;">replace</span>(<span style="color: rgb(136, 0, 0); font-weight: 400;">"#"</span>, <span style="color: rgb(136, 0, 0); font-weight: 400;">""</span>);\n' +
        '    currentTab$.<span style="color: rgb(136, 0, 0); font-weight: 700;">next</span>(href);\n' +
        "  };\n" +
        "\n" +
        '  <span style="color: rgb(68, 68, 68); font-weight: 700;">return</span> render<span style="color: rgb(136, 0, 0); font-weight: 400;">`\n' +
        '    &lt;div class="container"&gt;\n' +
        '      &lt;ul class="nav"&gt;\n' +
        '        <span style="color: rgb(136, 0, 0); font-weight: 400;">${NavLink({ href: <span style="color: rgb(136, 0, 0); font-weight: 400;">"#home"</span>, text: <span style="color: rgb(136, 0, 0); font-weight: 400;">"Home"</span>, onClick: handleClick })}</span>\n' +
        '        <span style="color: rgb(136, 0, 0); font-weight: 400;">${NavLink({ href: <span style="color: rgb(136, 0, 0); font-weight: 400;">"#about"</span>, text: <span style="color: rgb(136, 0, 0); font-weight: 400;">"About"</span>, onClick: handleClick })}</span>\n' +
        '        <span style="color: rgb(136, 0, 0); font-weight: 400;">${NavLink({ href: <span style="color: rgb(136, 0, 0); font-weight: 400;">"#contacts"</span>, text: <span style="color: rgb(136, 0, 0); font-weight: 400;">"Contacts"</span>, onClick: handleClick })}</span>\n' +
        "      &lt;/ul&gt;\n" +
        '      &lt;div class="p-3"&gt;\n' +
        '        <span style="color: rgb(136, 0, 0); font-weight: 400;">${If(isTabActive$(<span style="color: rgb(136, 0, 0); font-weight: 400;">"home"</span>), () =&gt; HomePage())}</span>\n' +
        '        <span style="color: rgb(136, 0, 0); font-weight: 400;">${If(isTabActive$(<span style="color: rgb(136, 0, 0); font-weight: 400;">"about"</span>), () =&gt; AboutPage())}</span>\n' +
        '        <span style="color: rgb(136, 0, 0); font-weight: 400;">${If(isTabActive$(<span style="color: rgb(136, 0, 0); font-weight: 400;">"contacts"</span>), () =&gt; ContactsPage())}</span>\n' +
        "      &lt;/div&gt;\n" +
        "    &lt;/div&gt;\n" +
        "  `</span>;\n" +
        "};\n" +
        "\n" +
        '<span style="color: rgb(171, 86, 86); font-weight: 400;">document</span>.<span style="color: rgb(136, 0, 0); font-weight: 700;">querySelector</span>(<span style="color: rgb(136, 0, 0); font-weight: 400;">"#app"</span>)!.<span style="color: rgb(136, 0, 0); font-weight: 700;">replaceChildren</span>(...<span style="color: rgb(136, 0, 0); font-weight: 700;">App</span>());\n' +
        "</pre>",
    ])}
  `;
};

export const ContactsPage = () => {
  return render`
    <div>
      Github:
      <a href="https://github.com/dsvgit">https://github.com/dsvgit</a>
    </div>
  `;
};
