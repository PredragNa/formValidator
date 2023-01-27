/* eslint-disable no-console */
import FormValidator from './form-validator/form-validator';

// eslint-disable-next-line no-new
new FormValidator(
  document.getElementById('form') as HTMLFormElement,
  (state) => console.log(state),
  () => console.log('Form has error'),
);

const button = document.querySelector('.js-show-field');
button?.addEventListener('click', (event) => {
  const fieldWrapper = (event.target as HTMLButtonElement).closest('.flex');
  fieldWrapper?.querySelector('.js-field')?.classList.toggle('hidden');
});
