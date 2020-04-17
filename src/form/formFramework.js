export function createControl(config, validators) {
  return {
    ...config,
    validators,
    valid: !validators,
    touched: false,
    value: '',
  }
}

export function createOptionControl(number) {
  return createControl(
    {
      label: `Enter answer ${number}`,
      errorMessage: 'Field is required',
      id: number,
    },
    {
      required: true,
    },
  )
}

export function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Enter question',
        errorMessage: 'Questin is required',
      },
      {
        required: true,
      },
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export function validate(value, validators = null) {

  if (!validators) {
    return true;
  }

  let isValid = true;

  if (validators.required) {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {

  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}