import { register } from './validation-lib';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form') as HTMLFormElement;
  const validate = register(form, {
    email: {
      valueAsMail: true,
    },
    password: {
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long',
      },
      maxLength: { value: 100 },
      pattern: {
        value: /[^a-zA-Z0-9\s]/,
        message: 'Password must contain at least one special character',
      },
    },
    firstname: {
      minLength: { value: 2 },
      maxLength: { value: 50 },
      pattern: {
        value: /^[a-zA-Z ]+$/,
        message: 'Name must be alphabetical only',
      },
    },
    lastname: {
      minLength: { value: 2 },
      maxLength: { value: 50 },
      pattern: {
        value: /^[a-zA-Z ]+$/,
        message: 'Name must be alphabetical only',
      },
    },
    birthday: {
      valueAsDate: true,
    },
    'github-id': {
      customRules: {
        valid: {
          validationFunc: async () => {
            const firstName = (
              document.querySelector(
                'input[name="github-id"]',
              ) as HTMLInputElement
            ).value;
            const response = await fetch(
              `https://api.github.com/users/${firstName}`,
            );
            return response.ok;
          },
          message: 'ID is not valid',
        },
      },
    },
  });

  const inputs = form.querySelectorAll('input');
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
  const validMsg = document.getElementById('valid-msg') as HTMLElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate().then((result) => {
      if (Object.keys(result).length === 0) validMsg.classList.remove('d-none');
      for (const [name, errors] of Object.entries(result)) {
        if (!errors) continue;
        const input = form.elements.namedItem(name) as HTMLInputElement;
        const msgElement = input.nextElementSibling as HTMLElement;
        const errorMsg = Object.values(errors)[0];
        input.classList.add('is-invalid');
        msgElement.textContent = errorMsg;
      }
    });
  });

  inputs.forEach((input) =>
    input.addEventListener('focus', () => input.classList.remove('is-invalid')),
  );

  resetBtn.addEventListener('click', () => {
    validMsg.classList.add('d-none');
    inputs.forEach((input) => {
      input.classList.remove('is-invalid');
      input.value = '';
    });
  });
});
