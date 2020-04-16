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