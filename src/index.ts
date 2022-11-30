import "./style/styles.scss";
import Form from "./form/form";

new Form(document.getElementById("form") as HTMLFormElement);
const button = document.querySelector(".js-show-field");
button?.addEventListener("click", (event) => {
  const fieldWrapper = (event.target as HTMLButtonElement).closest(".flex");
  fieldWrapper?.querySelector(".js-field")?.classList.toggle("hidden");
});
