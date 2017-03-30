import hostname from 'SRC/utils/host'

const users = {
  // Get a users' profile
  getUserInfo: (id1, id2) => `${hostname()}/api/users/view_profile?myid=${id1}&otherid=${id2}`,
  // Switch the state of follow sour -> dest
  switchFollow: (id1, id2, flag) => `${hostname()}/api/users/follow?sour=${id1}&dest=${id2}&isFollow=${flag}`,
  // Retrive the users list followed by specific user
  getUsersFollowedBy: (uid) => `${hostname()}/api/users/follow/list?uid=${uid}`,
  // User Login
  userLogin: `${hostname()}/api/users/login`,
  // User Login
  userRegister: `${hostname()}/api/users/register`
}

export default users
