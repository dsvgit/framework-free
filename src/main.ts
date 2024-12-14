import { BehaviorSubject, map } from "rxjs";

import { If, render } from "./render";
import { AboutPage, ContactsPage, HomePage } from "./pages.ts";
import { NavLink } from "./nav.ts";

const App = () => {
  const currentTab$ = new BehaviorSubject(
    location.hash.replace("#", "") || "home",
  );
  const isTabActive$ = (tab: string) =>
    currentTab$.pipe(map((value) => value === tab));

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const href = target.getAttribute("href")!.replace("#", "");
    currentTab$.next(href);
  };

  return render`
    <div class="container">
      <ul class="nav">
        ${NavLink({ href: "#home", text: "Home", onClick: handleClick })}
        ${NavLink({ href: "#about", text: "About", onClick: handleClick })}
        ${NavLink({ href: "#contacts", text: "Contacts", onClick: handleClick })}
      </ul>
      <div class="p-3">
        ${If(isTabActive$("home"), () => HomePage())}
        ${If(isTabActive$("about"), () => AboutPage())}
        ${If(isTabActive$("contacts"), () => ContactsPage())}
      </div>
    </div>
  `;
};

document.querySelector("#app")!.replaceChildren(...App());
