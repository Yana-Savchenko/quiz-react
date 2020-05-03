import React from 'react';

import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import { createFormControls, validate, validateForm } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import { finishCreateQuiz, createQuizQuestion } from '../../redux/actions/create';

class QuizCreator extends React.Component {

  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  }

  addQuestionHandler = () => {

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ]
    }

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    })

  }

  createQuizHandler = () => {

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    })

    this.props.finishCreateQuiz()
  }

  changeHandler = (value, controlName) => {

    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validators);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    })

  }

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <React.Fragment key={index}>
          <Input
            key={controlName + index}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validators}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {index === 0 && <hr />}
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = e => {
    this.setState({ rightAnswerId: +e.target.value })
  }

  submitHandler = e => {
    e.preventDefault();
  }

  render() {

    return (
      <div className={classes.quizCreator}>
        <div>
          <h1>Create a quiz</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            <Select
              label='Select a right answer'
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
              ]}
            />

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={!this.props.quiz.length}
            >
              Create quize
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  }
}

function mapDispathToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(QuizCreator);