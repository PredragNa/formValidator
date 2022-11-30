import { FormMethodes } from "./form.interface";
import FormFieldFactory from "./field.factory";

export default class {
  observer: MutationObserver;
  methodes: FormMethodes;

  constructor(element: HTMLFormElement, methodes: FormMethodes) {
    this.methodes = methodes;
  }

  dynamicChangeHandler = (
    mutationsList: MutationRecord[],
    observer: MutationObserver
  ) => {
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("A child node has been added or removed.");
        if (mutation.removedNodes.length) {
          mutation.removedNodes.forEach((element) => {
            const name = element.getAttribute("name");
            if (name) {
              this.methodes.unRegister(name);
            }
          });
          this.observer.takeRecords();
        }
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((element) => {
            const field = element.querySelector("[name]");
            new FormFieldFactory(field, this.methodes);
          });
          this.observer.takeRecords();
        }
      }
    }
  };
}
