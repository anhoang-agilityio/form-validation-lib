# Form Validation Library

A simple Typescript library that helps your work easier 

## Installation

Prerequisites:
- Node 20+
- A `gitlab.asoft-python.com` account with SSH key linked with your local machine

To set up the app execute the following commands.

```
git clone git@gitlab.asoft-python.com:an.hoang/frontend-training.git
cd frontend-training
git checkout form-validation-lib
npm install
```


**`npm run dev`**

Runs the app in the development mode.  
Open http://localhost:5173 to view it in the browser.

## Usage
1. **Including library**
    - Add the library's Typescript file to the head or right before the body tags.
    - Path to the library can be changed depending on the relative position of the HTML and library folder

    ```html
    <html>
        <head>
          <!-- Put library here -->
          <script src="src/validation-lib/index.ts" type="module"></script>
        </head>
        <body>
            ...
            <!-- Or here -->
            <script src="src/validation-lib/index.ts" type="module"></script>
        </body>
    </html>
    ```
2. **Writing form**
   - Each input field must have a unique `name` attribute and be placed in its own `data-form-group` attribute individual container
   - The only exception is checkboxes and radio buttons: They are allowed to have the same name, but they must be in the same type and placed in the same container like the above rule
   - To display error messages, include a tag in the same container with input field with `data-form-error` attribute. If you don't want to use this feature, just don't include this tag
   - The following snippet is a basic example of form declaration:
   ```html
   <form id="loginForm" method="POST">
            <div data-form-group>
                <label>Username</label>
                <input type="text" name="username" />
                <div data-form-error></div>
            </div>

            <div data-form-group>
                <label>Password</label>
                <input type="password" name="password" />
                <div data-form-error></div>
            </div>

            <button type="submit">Submit</button>
        </form>
   ```
3. **Declaring validation rules**:
   - Use `register` function from the library: `register(form, validationConfig)` 
   - The function accepts two parameters:
     - The first parameter is the form element, which can be retrieved by any DOM querying element methods 
     - The second parameter contains the configuration which is actually an object. Its fields property maps the field name to the validator rules. The field name is defined by the `name` attribute, while the validator rules are defined by mapping the validator name to its options.
   - All validators provide a common option named message that will be used to inform the user if the associated field is invalid. If you don't specify any message, the library will apply the default one designed for each rule
   - Available rules:
     - `required`:
       - The trimmed field value must not be an empty string.
       - For multiple checkboxes / radio buttons with the same name, at least one of these must be checked
       - For file inputs, at least one file must be included
     - `minLength`:
       - The trimmed field value must be at least a given size.
     - `maxLength`:
       - The trimmed field value must be no greater than a given size
     - `pattern`:
       - The trimmed field value must be satisfied the specified pattern
       - The pattern can be declared using RegExp, or on of these keywords:
         - `number`: number pattern - only accept digits
         - `date`: YYYY-MM-DD 
         - `email`: a built-in email pattern
         - `phone`: a built-in phone pattern - only accept digits, must be started by 0, and size in between 10 or 11 characters
     - `minValue`:
       - Only take effect when pattern is `number`
       - The trimmed field value must be at least a given value
     - `maxValue`:
       - Only take effect when pattern is `number`
       - The trimmed field value must be no greater than a given value
     - `customRule`:
       - Your custom validation function
       - It takes the input value as it parameter, and return a boolean or Promise boolean value which is `true` if the validation pass, otherwise `false` 
   - Example:
     ```typescript
     register(form, {
       firstname: {
         required: true,
         maxLength: 20,
       },
       password: {
         required: true,
         minLength: {
           value: 8,
           message: 'Password must be at least 8 characters',
         },
       },
      });
     ```
4. **Form effect**:
   - After 'register' the form, each input will be validated when it loses focus, and the entire form will be validated when we submit the form
   - When we focus an input, its validation state will be reset
   - Inputs passed validation will be added `is-valid` class to its `data-form-group` container, otherwise the `is-invalid` class will be added
   - Error messages will be added to error message containers when validation fails, otherwise its text will be cleared
   - You can use these classes to style for different form state