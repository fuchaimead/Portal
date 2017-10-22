const groupId = (state = [], action) => {
  switch (action.type) {
    case 'SET_GROUP_ID':
      return action.groupId
    default:
      return state;
  }
}

export default groupId;
