import { customAlphabet } from "nanoid";
import { Observable } from "rxjs";

type Dispose = () => void;
type RenderDisposable = { dispose: Dispose };
type RenderElement = RenderDisposable & Element[];
type RenderHandler = (...elements: any[]) => void | Dispose;

type RenderHook = RenderElement | RenderHandler | string;

export const render = (
  strings: readonly string[],
  ...hooks: RenderHook[]
): RenderElement => {
  const elementToId = new Map<Element, string>();
  const handlers: RenderHandler[] = [];

  const walkHook = (hook: RenderHook) => {
    if (typeof hook === "function") {
      handlers.push(hook);
      return [""];
    }

    if (Array.isArray(hook)) {
      return hook
        .map((element) => {
          const id = nanoid();
          elementToId.set(element, id);
          return `<div id="${id}"></div>`;
        })
        .join("");
    }

    return [String(hook)];
  };

  const raw = String.raw({ raw: strings }, ...hooks.map(walkHook));
  const template = document.createElement("template");
  template.innerHTML = raw;

  for (const element of elementToId.keys()) {
    template.content
      .querySelector(`#${elementToId.get(element)}`)!
      .replaceWith(element);
  }

  const disposes: Dispose[] = [];
  for (const handler of handlers) {
    const elements = Array.from(template.content.children);
    const dispose = handler(...elements);
    dispose && disposes.push(dispose);
  }

  const dispose = () => disposes.forEach((d) => d());

  return disposable(Array.from(template.content.children), dispose);
};

const disposable = <T extends object>(
  target: T,
  dispose: () => void,
): T & RenderDisposable => {
  const t = target as T & RenderDisposable;
  t.dispose = dispose;
  return t;
};

export const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  8,
);

export const If = <T extends () => RenderElement>(
  condition$: Observable<boolean>,
  render: T,
): RenderElement => {
  const comment = document.createComment("");
  const fragment = document.createDocumentFragment();
  fragment.replaceChildren(comment);

  let elements: RenderElement | undefined;

  condition$.subscribe((value) => {
    if (value && !elements) {
      elements = render();

      comment.replaceWith(...elements);
      return;
    }

    if (!value && elements) {
      const [first, ...rest] = elements;
      if (first) {
        first.replaceWith(comment);
        rest.forEach((element) => element.remove());
      }
      elements.dispose();
      elements = undefined;
    }
  });

  // TODO: return childNodes because we need comment to be rendered
  // @ts-expect-error
  return disposable(Array.from(fragment.childNodes), () => {
    if (elements) {
      elements.dispose();
    }
  });
};
