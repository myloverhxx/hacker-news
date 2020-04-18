<template>
  <a-spin tip="Loading..." :spinning="loading">
    <header class="header">
      <h1 class="logo"><img src="https://news.ycombinator.com/y18.gif" />Hacker News</h1>
      <div class="menu">
        <a>new</a>
        <span>|</span>
        <a>past</a>
        <span>|</span>
        <a>comments</a>
        <span>|</span>
        <a>ask</a>
        <span>|</span>
        <a>show</a>
        <span>|</span>
        <a>jobs</a>
        <span>|</span>
        <a>submit</a>
      </div>
    </header>
    <div class="content">
      <div class="content-top">
        <h2> {{story.title}}</h2>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="huangxx"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="6" :cols="60" :value="comment" @change="handleChange"></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button htmlType="submit" :loading="submitting" @click="addComment" type="primary">
                add comment
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
      <div class="content-main">
        <comment-item v-if="commentList.length > 0" :commentList="commentList" :loading="loading"></comment-item>
      </div>
    </div>
  </a-spin>
</template>

<script>
import CommentItem from '@/components/comment-item/comment-item'
import * as api from '@/api'
export default {
  data() {
    return {
      loading: true,
      submitting: false,
      itemId: 22889778,
      comment: '',
      story: {},
      commentList: [],
    }
  },
  created() {
    Promise.all([api.getStory(this.itemId), api.getCommentList(this.itemId)])
      .then(([res1, res2]) => {
        this.loading = false
        this.story = res1;
        this.commentList = res2.children || [];
      })
  },
  methods: {
    handleChange(e) {
      this.comment = e.target.value;
    },
    addComment() {
      if (!this.comment) return;

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        this.commentList = [
          {
            author: 'huangxx',
            type: 'comment',
            text: this.comment,
            created_at: new Date().valueOf(),
            parent: this.itemId,
            children: []
          },
          ...this.commentList
        ]
        this.comment = '';
      }, 1000);
    },
  },
  components: {
    CommentItem
  }
}
</script>

<style lang="scss">
h1 {
  margin: 0;
}
.header {
  width: 100%;
  height: 24px;
  padding: 0;
  background-color: #ff6600;
  position: fixed;
  top: 0;
  z-index: 99;

  .logo,
  .menu {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
  }
  .logo {
    margin-right: 24px;
    img {
      width: 16px;
      height: 16px;
      border: 1px solid #fff;
      vertical-align: text-top;
      margin: 2px 8px 0 2px;
    }
  }
  
  .menu {
    a {
      color: #000;
      &:hover {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
.content {
    margin-top: 24px;
    padding: 20px;
  }
</style>