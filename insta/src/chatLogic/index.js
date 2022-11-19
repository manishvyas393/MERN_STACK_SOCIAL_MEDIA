export const getSender = (logged, users) => {
      return users[0]?._id === logged?._id ? users[1] : users[0];
}