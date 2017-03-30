export const CLIENT_USER = {
  LOAD: '@Client/user/info/LOAD',
  UPDATE: '@Client/user/info/UPDATE'
}

export const CLIENT_PROFILE_USER_INFO = {
  LOAD: '@Client/user/profile/LOAD',
  UPDATE: '@Client/user/profile/UPDATE',
  LOAD_USERS_FOLLOWED_BY: '@Client/user/profile/USERS_FOLLOWED_BY'
}

export const CLIENT_TOPICS = {
  LOAD_TOPIC_LIST: '@Client/topics/LOAD_TOPIC_LIST',
  LOAD_EVENT_LIST: '@Client/topics/LOAD_EVENT_LIST',
  LOAD_USER_TOPICS: '@Client/topics/LOAD_USER_TOPICS',
  SWITCH_SUBSCRIBE: '@Client/topics/SWITCH_SUBSCRIBE'
}

export const CLIENT_EVENTS = {
  LOAD_USER_POSTS: '@Client/events/LOAD_USER_POSTS',
  LOAD_SINGLE_EVENT: '@Client/events/LOAD_SINGLE_EVENT',
  LOAD_COMENTS: '@Client/events/LOAD_COMENTS',
  SWITCH_LIKE: '@Client/events/SWITCH_LIKE',
  UPDATE_EVENT_FIELDS: '@Client/events/UPDATE_EVENT_FIELDS'
}

export const CLIENT_FEEDS = {
  LOAD_FEEDS: '@Client/feeds/LOAD_FEEDS',
  LOAD_ADS: '@Client/feeds/LOAD_ADS',
  RESET_FEEDS: '@Client/feeds/RESET_FEEDS'
}

export const ADS = {
  LOAD_SPONSORS: '@Client/ads/LOAD_SPONSORS',
  LOAD_SPONSOR_INFO: '@Client/ads/LOAD_SPONSOR_INFO',
  LOAD_ADS: '@Client/ads/LOAD_ADS',
  LOAD_USER_SETS: '@Client/ads/LOAD_USER_SETS',
  LOAD_PUSHES: '@Client/ads/LOAD_PUSHES'
}
