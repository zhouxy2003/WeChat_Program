
Page({
  data: {
    chatdata: [
      "你好，有什么可以帮助你的",
    ],
    userSay: "",
    isAnswer: true,
    scrollIntoView: "", // 滚动到指定的元素ID
    scrollToBottom: true, // 是否滚动到底部
  },
  getInput(e) {
    this.setData({
      userSay: e.detail.value
    })
  },
  sendMessage() {
    if (this.data.userSay.trim() !== "" && this.data.isAnswer) {
      let temp = this.data.chatdata;
      temp.push(this.data.userSay);
      this.setData({
        chatdata: temp,
        isAnswer: false,
        scrollToBottom: true // 在发送消息后设置为true，以便滚动到底部
      })
      this.getAnswerByAi();
      this.setData({
        scrollIntoView: 'bottom', // 发送消息后滚动到底部
      });
    }
  },
  // 发起数据请求
  getAnswerByAi() {
    const url_token = "https://aip.baidubce.com/oauth/2.0/token?client_id=hi0uWUpMrlpQ4UxnyX5PmKXu&client_secret=HParNc0D1AvzAKY2sqbvCjIKuvhqOpmY&grant_type=client_credentials";

    wx.request({
      url: url_token,
      method: "POST",
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      success: res => {
        const access_token = res.data.access_token
        const url_chat = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=" + access_token

        const payload = {
          "messages": [
            {
              "role": "user",
              "content": this.data.userSay
            }
          ]
        };
        wx.request({
          url: url_chat,
          method: "POST",
          data: payload,
          header: {
            'Content-Type': 'application/json'
          },
          // 请求成功将收到的数据压入遍历数组
          success: (res) => {
            let temp = this.data.chatdata;
            temp.push(res.data.result);
            this.setData({
              chatdata: temp,
              isAnswer: true,
              userSay:" ",
              scrollToBottom: true // 在接收到回复后设置为true，以便滚动到底部
            });
            console.log(res.data);

            // 滚动到底部
            if (this.data.scrollToBottom) {
              this.setData({
                scrollIntoView: 'bottom',
                scrollToBottom: false
              });
            }
          }
        });
      },
    });
  },
  onLoad: function () {
    // 设置初始滚动到底部
    this.setData({
      scrollIntoView: 'bottom'
    });
  }
});
