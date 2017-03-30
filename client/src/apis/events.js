import hostname from 'SRC/utils/host'

const events = {
  switchLikeStatus: (uid, eid, isLike) => `${hostname()}/api/likes?uid=${uid}&eid=${eid}&isLike=${isLike}`,
  getPostsOfUser: (uid, myid) => `${hostname()}/api/posts/user?uid=${uid}&myid=${myid}`,
  getSingleEvent: (eid, myid) => `${hostname()}/api/event?eid=${eid}&myid=${myid}`,
  getComments: (eid) => `${hostname()}/api/event/comments?eid=${eid}`,
  createComments: `${hostname()}/api/event/comments`,
  editEvent: `${hostname()}/api/event/create`,
  deleteEvent: `${hostname()}/api/event/delete`
}

export default events
