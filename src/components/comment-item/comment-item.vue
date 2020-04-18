<template>
  <a-skeleton :loading="loading" active>
    <div class="comment-container">
      <a-list
        v-if="list.length"
        :dataSource="list"
        itemLayout="horizontal"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-comment v-show="!hideItemIds.includes(item.id)">
            <span slot="actions" key="comment-nested-reply-to" @click.prevent="showTextarea(item)">Reply to</span>
            <a slot="author">{{item.author}}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              :alt="item.author"
            />
            <p slot="content" v-html="item.text"></p>
            <span slot="datetime" style="cursor: pointer" @click.prevent="hideItem(item.id)">[-]</span>
            <a-comment v-if="item.id === showTextareaItemId">
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
                  <a-button htmlType="submit" :loading="submitting" @click="addReply(item, index)" type="primary">
                    add reply
                  </a-button>
                  <a-button @click="cancelReply" style="margin-left: 20px">
                    cancel reply
                  </a-button>
                </a-form-item>
              </div>
            </a-comment>
            <comment-item v-if="item.children && item.children.length > 0" :commentList="item.children" :loading="loading"></comment-item>
          </a-comment>
          <a-comment v-show="hideItemIds.includes(item.id)">
            <a slot="author">{{item.author}}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              :alt="item.author"
            />
            <span slot="datetime" style="cursor: pointer" @click.prevent="expandItem(item.id)">{{item.total}} +</span>
          </a-comment>
        </a-list-item>
      </a-list>
    </div>
  </a-skeleton>
</template>

<script>
export default {
  name: 'comment-item',
  props: {
    commentList: {
      type: Array,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      itemIndex: null,
      showTextareaItemId: '',
      hideItemIds: [],
      comment: '',
      submitting: false
    }
  },
  computed: {
    list() {
      return this.commentList
    }
  },
  methods: {
    showTextarea(item) {
      this.showTextareaItemId = item.id
    },
    handleChange(e) {
      this.comment = e.target.value
    },
    // 回复评论
    addReply(item, index) {
      if (!this.comment) return;

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        const data = {
          id: Number('' + item.id + index),
          author: 'huangxx',
          type: 'comment',
          text: this.comment,
          created_at: new Date(),
          created_at_i: new Date().valueOf(),
          parent_id: item.id,
          children: [],
          options: [],
          story_id: 22889778,
        }
        this.list.length > 0 && this.list[index].children && this.list[index].children.push(data)
        this.cancelReply()
      }, 1000);
    },
    cancelReply() {
      this.comment = '';
      this.showTextareaItemId = ''
    },
    // 收起
    hideItem(id) {
      let item = [];
      this.list.forEach((it, i) => {
        if(it.id === id) {
          item.push(it);
          this.itemIndex = i
        } 
      })
      this.hideItemIds.push(id)
      this.$set(this.list[this.itemIndex], 'total', 1)
      this.getTotalComments(item);
    },
    // 展开
    expandItem(id) {
      let index = this.hideItemIds.indexOf(id);
      this.hideItemIds.splice(index, 1)
    },
    // 统计当前 item 所有后代的长度，包括自身，隐藏时自身也隐藏了。
    getTotalComments(arr) {
      if(Array.isArray(arr) && arr.length > 0) {
        arr.forEach((v,i) => {
          if(v.children && v.children.length > 0) {
            this.$set(this.list[this.itemIndex], 'total', this.list[this.itemIndex].total + v.children.length)
            this.getTotalComments(v.children);
          } else {
            this.$set(this.list[this.itemIndex], 'total', this.list[this.itemIndex].total)
          }
        })
      }
    }
  },
}
</script>

<style>

</style>