import FormValidator from "./form-validator/form-validator";
import { FormState, Message } from "./form-validator/form.interface";

const form = document.getElementById("form") as HTMLFormElement;
const messagesJSON = form.getAttribute("data-messages");
let messages: Message;

if (messagesJSON) {
  messages = JSON.parse(messagesJSON);
}

if (form && messages) {
  new FormValidator(
    form,
    messages,
    (state: FormState) => console.log(state),
    () => console.log("Form has error")
  );
}
