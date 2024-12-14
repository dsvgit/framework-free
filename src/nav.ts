import { render } from "./render.ts";

type Props = {
  text: string;
  href: string;
  onClick?: (e: MouseEvent) => void;
};

export const NavLink = (props: Props) => {
  const { text, href, onClick } = props;

  return render`
    <li class="nav-item">
      ${render`
        <a class="nav-link" href="${href}">${text}</a>
        ${(element: HTMLElement) => {
          onClick && element.addEventListener("click", onClick);
        }}
      `}
    </li>
  `;
};
