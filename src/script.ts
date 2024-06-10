import { register } from './validation-lib';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form') as HTMLFormElement;
  register(form, {
    email: {
      required: true,
      pattern: 'email',
    },
    password: {
      required: true,
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters long',
      },
      maxLength: {
        value: 20,
        message: 'Password must be no greater than 20 characters long',
      },
      pattern: {
        value: /[^a-zA-Z0-9\s]/,
        message: 'Password must contain at least one special character',
      },
    },
    firstname: {
      minLength: 2,
      maxLength: 50,
      pattern: {
        value: /^[a-zA-Z ]+$/,
        message: 'Name must be alphabetical only',
      },
    },
    lastname: {
      minLength: 2,
      maxLength: 50,
      pattern: {
        value: /^[a-zA-Z ]+$/,
        message: 'Name must be alphabetical only',
      },
    },
    gender: {
      required: true,
    },
    birthday: {
      pattern: 'date',
    },
    github: {
      customRule: {
        value: async (value) => {
          const response = await fetch(`https://api.github.com/users/${value}`);
          return response.ok;
        },
        message: 'ID is not valid',
      },
    },
    agreeTerm: {
      required: {
        value: true,
        message: 'You must agree before submitting',
      },
    },
  });
});
