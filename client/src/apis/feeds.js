import hostname from 'SRC/utils/host'

const feeds = {
  loadFeeds: (myid, offset, count, timestamp) =>
    `${hostname()}/api/posts/feeds?uid=${myid}&offset=${offset}&count=${count}&timestamp=${parseInt(timestamp / 1000)}`,
  loadAds: (myid, count) => `${hostname()}/api/sponserposts/user?uid=${myid}&num=${count}`
}

export default feeds
