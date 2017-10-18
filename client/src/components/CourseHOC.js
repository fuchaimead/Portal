import { Component } from 'react';
import { connect } from 'react-redux';
import { validateToken } from '../actions/auth';
import { getCoursesByStudent } from '../actions/courses';

class CourseHOC extends Component {
  state = { coursesLoaded: false };

  setCoursesLoaded = () => this.setState({ coursesLoaded: true });

  componentDidMount() {
    const { dispatch, user } = this.props;
    // this.setCoursesLoaded();
    if(user.id){
      dispatch(getCoursesByStudent(user.id));
    }else{
      this.setCoursesLoaded();
    }

  }

  componentWillReceiveProps(nextProps) {
    this.props.dispatch(getCoursesByStudent(nextProps.user.id));
    if (!this.state.coursesLoaded) this.setCoursesLoaded();
  }

  render() {
    console.log(this.state.coursesLoaded)
    return this.state.coursesLoaded ? this.props.children : null;
  }
}

const mapStateToProps = state => {
  return {
    courses: state.userCourses,
    user: state.user
   };
};

export default connect(mapStateToProps)(CourseHOC);
