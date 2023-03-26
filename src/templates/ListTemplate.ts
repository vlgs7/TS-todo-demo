import FullList from "../model/FUllList";

interface DOMList {
  ul: HTMLDListElement;
  clear(): void;
  render(fulllist: FullList): void;
}
export default class ListTemplate implements DOMList {
  ul: HTMLDListElement;
  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLDListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fulllist: FullList): void {
    this.clear();

    fulllist.list.forEach((item) => {
      const li = document.createElement("li") as HTMLElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id;
      check.tabIndex = 0;
      check.checked = item.checked;
      li.append(check);

      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fulllist.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fulllist.removeItem(item.id);
        this.render(fulllist);
      });

      this.ul.append(li);
    });
  }
}
