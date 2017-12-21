import React from 'react';
import DatePicker from './DatePicker';
import StudentRecord from './StudentRecord';
import { connect } from 'react-redux';
import { getUsers, markAllPresent } from '../../actions/users';
import { addAttendance, getAttendance } from '../../actions/attendance';
import { Button, Container, Header, Icon } from 'semantic-ui-react';

class Attendance extends React.Component {
  state = { courseId: 10 }

  componentDidMount() {
    const { dispatch, currentDate } = this.props;
    const { courseId } = this.state;
    dispatch(getUsers());
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentDate, dispatch } = this.props;
    // when finished dispatch this action
    // dispatch(getAttendance(this.state.courseId, nextProps.currentDate))
  }

  displayUsers = () => {
    const { users } = this.props;
    const { allPresent } = this.state;
    let status = allPresent ? 'present' : ''
    return users.map( user => {
      return <StudentRecord key={user.id} user={user} status={status} />
    })
  }

  submitAttendance = () => {
    const { dispatch, users, currentDate } = this.props;
    const { courseId } = this.state;
    // TODO: replace courseId with dynamic number
    dispatch(addAttendance(courseId, users, currentDate));
  }

  allPresent = () => {
    this.props.dispatch(markAllPresent())
  }

  allChosen = () => {
    const { users } = this.props
    let finished = true
    users.forEach( user => {
      if(!user.status)
        finished = false
    })
    if(finished)
      return(
        <Button basic onClick={this.submitAttendance}>
          Submit Attendance
        </Button>
      )
    return null
  }

  render() {
    return(
      <Container>
        <Header as='h1' textAlign='center'>Attendance</Header>
        <DatePicker sendDate={this.sendDate} courseId={this.state.courseId}/>
        { this.allChosen() }
        <Button basic onClick={this.allPresent}>
          <Icon name='check circle outline' color='green' />
          Mark All Present
        </Button>
        <br/>
        <br/>
        { this.displayUsers() }
        <br/>
        { this.allChosen() }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    currentDate: state.currentDate
  }
}

export default connect(mapStateToProps)(Attendance);
