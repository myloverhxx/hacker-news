// import axios from 'axios'
import mock from '@/mock'

// const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
// const COMMENT_BASE_URL = 'https://hn.algolia.com/api/v1'

// 获取 story
export function getStory(itemId) {
  return new Promise((resolve, reject) => {
    resolve(mock.story)
  })
  // return axios.get(`${BASE_URL}/item/${itemId}.json?print=pretty`)
  //   .then(response => {
  //     return response && response.data
  //   })
  //   .catch(error => {})
}

// 获取 commentList
export function getCommentList(itemId) {
  return new Promise((resolve, reject) => {
    resolve(mock.comments)
  })
  // return axios.get(`${COMMENT_BASE_URL}/items/${itemId}`)
  //   .then(response => {
  //     return response && response.data
  //   })
  //   .catch(error => {})
}

