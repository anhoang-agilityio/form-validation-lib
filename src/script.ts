import { register } from './validation-lib';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form') as HTMLFormElement;
  register(form, {
    firstname: {
      required: true,
    },
    lastname: {
      minLength: {
        value: 3,
        message: 'min length test',
      },
    },
  });
});
