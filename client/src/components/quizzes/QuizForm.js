import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  Divider,
} from 'semantic-ui-react';
import { addQuiz } from '../../actions/quizzes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RiftEditor from '../Rift/riftEditor/RiftEditor';
import { PageTitle } from '../../styles/styledComponents';


class QuizForm extends Component {
state = { title: '', content: '', due_date:'', points: '' }

handleSubmit = (e) => {
  const { history, dispatch } = this.props
  const { due_date, title, content, points } = this.state
  e.preventDefault();
  let quiz = { due_date: due_date, title: title, content: content, points: points }
  dispatch(addQuiz(quiz, history))
}

handleChange = (e, { name, value }) => this.setState({ [name]: value })

riftChange = (rift) => {
  this.setState({ content: rift })
}
 
  render(){
    const { title, due_date, points } = this.state
    return(
      <Container> 
        <PageTitle>Create Quiz</PageTitle>
          <Form onSubmit={this.handleSubmit} style={styles.form}>
            <Form.Group widths='equal'>
              <Form.Input 
                label='Title'
                name='title'
                value={title}  
                width={9}
                placeholder='Quiz Title' 
                autoFocus={true}
                required
                onChange={this.handleChange}>
              </Form.Input>
              <Form.Input 
                name='due_date'
                value={due_date}
                label='Due Date' 
                type='date' 
                width={4}
                onChange={this.handleChange}
                 >
              </Form.Input>
              <Form.Input 
                label='Points'
                placeholder='Points' 
                name='points'
                value={points}
                type='number' 
                required 
                onChange={this.handleChange}
                width={3} />
            </Form.Group>
           <RiftEditor riftChange={this.riftChange} />
            <Divider />
            <Form.Checkbox label='Published?' />
            <Divider />
            <Form.Group>
              <Button basic type='submit'>Create</Button> 
            <Link to={`./quizzes`} > 
              <Button basic> Cancel </Button> 
            </Link>
            </Form.Group>
          </Form> 
      </Container> 
    )
  }
}

const styles = {
  form: {
    paddingTop: '2%',
  },
  textArea: {
    minHeight: '150px',
  },
}


export default connect()(QuizForm);
