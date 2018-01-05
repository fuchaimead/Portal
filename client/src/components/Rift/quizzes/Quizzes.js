import React, { Component } from 'react';
import { Header, Table, Container, Button, Icon, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

class Quizzes extends Component {
  state = { quizzes: [] }

componentDidMount() {
  axios.get('/api/quizzes')
  .then( res => {
    this.setState({ quizzes: res.data })
  })
  .catch( err => {
    console.log(err);
  });
}

displayQuizzes = () => {
  return this.state.quizzes.map(quiz => {
    let time = moment(quiz.created_at).format('MMMM D, YYYY')
    let date = moment(quiz.due_date).format('MMMM D, YYYY')
    return(
      <Table.Row key={quiz.id}>
        <Link to={`./quizzes/${quiz.id}`}>
         <Table.Cell>{quiz.title}</Table.Cell>
        </Link>
        <Table.Cell>{time}</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
      </Table.Row>
    )
  })
}
  render() {
    return (
      <Container>
       <Header textAlign='center' style={styles.quiz} > Quizzes  </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
            </Grid.Column>
            <Grid.Column width={2}>
            <Link to={'./quizform'}>
              <Button icon labelPosition='left'>
                <Icon name='add' />
              Quiz
              </Button>
            </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={6}> Name </Table.HeaderCell>
                <Table.HeaderCell width={4}> Created At </Table.HeaderCell>
                <Table.HeaderCell width={4}> Due Date </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.displayQuizzes()}
            </Table.Body>
          </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

}

const styles = {
  quiz: {
    paddingTop: '2%',
  }
}

export default Quizzes;
