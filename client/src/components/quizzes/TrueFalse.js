import React, { Component } from 'react';
import {
  Segment,
  Grid,
  Button,
  Form,
  Radio,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/quizQuestions';
import { addUpdate, editUpdate } from '../../actions/questionUpdates';


class TrueFalse extends Component {
state = { question: '', isTrue: '', hasUpdate: false }

componentDidMount() {
  const { text, editing, truth } = this.props
  if(editing)
    this.setState({ question: text, isTrue: truth })
}

sendUpdate = () => {
  const { dispatch, editing, questionId, options } = this.props
  const { question, isTrue } = this.state
  const truthy = (isTrue === 'true')
  const falsy = (isTrue === 'false')  
  if (editing) {
    const newOptions = [
      { id: options[0].id, text: 'True', correct: truthy },
      { id: options[1].id, text: 'False', correct: falsy },
    ]
    const tfQuestion = { id: questionId, question, options: newOptions, true_false: true }
    if (!this.state.hasUpdate) {
      dispatch(addUpdate(tfQuestion))
      this.setState({ hasUpdate: true })
    } else {
      dispatch(editUpdate(tfQuestion))
    }
  }
}

handleChange = (_, { name, value }) => {
  this.setState({ [name]: value }, this.sendUpdate)
}

handleCheck = (_, { value }) => {
  this.setState({ isTrue: value }, this.sendUpdate)
}

handleSubmit = (e) => {
  e.preventDefault()
  const { quizId, dispatch, hideForm } = this.props
  const { question, isTrue } = this.state
  const truthy = (isTrue === 'true')
  const falsy = (isTrue === 'false')
  const options = [
    { text: 'True', correct: truthy },
    { text: 'False', correct: falsy },
  ]
  const tfQuestion = { question, options, true_false: true }
  dispatch(addQuestion(quizId, tfQuestion))
  hideForm()
}

  render(){
    const { question } = this.state
    return (
    <Segment>
     <Form onSubmit={this.handleSubmit}>
        <Form.TextArea onChange={this.handleChange} name='question' value={question} label='Question'> </Form.TextArea>
        <Grid style={styles.grid} >
          <Grid.Row>
            <Grid.Column>
            <p> True </p>
            <p> False </p>
            </Grid.Column>
            <Grid.Column>
            <Radio
              name='radioGroup'
              value='true'
              checked={ this.state.isTrue === 'true' }
              onChange={ this.handleCheck } />
            <p> </p>
            <Radio
              name='radioGroup'
              value='false'
              checked={ this.state.isTrue === 'false' }
              onChange={ this.handleCheck } />
            </Grid.Column>
          </Grid.Row>
        </Grid>
          { !this.props.editing && <Button basic type='submit'> save question </Button> }
        </Form>
      </Segment>
    )
  }
}

const styles = {
  grid: {
    padding: '10px'
  }
}
export default connect()(TrueFalse);
