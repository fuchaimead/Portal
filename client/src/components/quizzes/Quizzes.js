import React, { Component } from 'react';
import {
  Table,
  Button,
  Icon,
  Grid,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { PageTitle } from '../../styles/styledComponents';
import _ from 'lodash';


class Quizzes extends Component {
  state = { quizzes: [], column: null, direction: null }

  componentDidMount() {
    axios.get('/api/quizzes')
      .then( res => {
        this.setState({ quizzes: res.data })
      }).catch( err => {
        // TODO
    });
  }

  handleSort = clickedColumn => () => {
    const { column, direction, quizzes } = this.state
    if (column === clickedColumn) {
      this.setState({
        column: clickedColumn,
        quizzes: _.sortBy(quizzes, [clickedColumn]),
        direction: 'ascending',
      })
    return
    }
    this.setState({
      quizzes: quizzes.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  displayQuizzes = () => {
    const { id } = this.props.match.params
    return this.state.quizzes.map(quiz => {
      let date = moment(quiz.due_date).format('MMMM D, YYYY')
      return(
        <Table.Row key={quiz.id}>
          <Table.Cell>
            <Link to={`/courses/${id}/quizzes/${quiz.id}`}> {quiz.title} </Link>
          </Table.Cell>
          <Table.Cell>{quiz.points}</Table.Cell>
          <Table.Cell>{date}</Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    const { id } = this.props.match.params;
    const { column, direction } = this.state;
    return (
      <div>
       <PageTitle>Quizzes</PageTitle>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
            </Grid.Column>
            <Grid.Column width={2}>
            <Link to={`/courses/${id}/quizform`}>
              <Button
                basic
                icon
                labelPosition='left'>
                <Icon name='add' />
              Quiz
              </Button>
            </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table basic='very' striped singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={6}
                  sorted={column === 'name' ? direction : null} 
                  onClick={this.handleSort('name')}> 
                  Name</Table.HeaderCell>
                <Table.HeaderCell width={4}
                  sorted={column === 'due_date' ? direction : null} 
                  onClick={this.handleSort('due_date')}> 
                  Points</Table.HeaderCell>
                <Table.HeaderCell width={4}
                  sorted={column === 'due_date' ? direction : null} 
                  onClick={this.handleSort('due_date')}> 
                  Due Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.displayQuizzes()}
            </Table.Body>
          </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


export default Quizzes;
