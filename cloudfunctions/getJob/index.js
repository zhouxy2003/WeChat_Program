// 云函数入口文件
const cloud = require('wx-server-sdk')
// 给定字符串环境 ID：接下来的 API 调用都将请求到环境 some-env-id
cloud.init({
  env: 'wxprogram-3g75c27k07e64dfb'
})

// "cloudfunctionRoot": "cloudfunctions/",
//   "cloudfunctionTemplateRoot": "cloudfunctionTemplate/" 
//package.config.json

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const collection = db.collection('job') // 替换成你的集合名称

  try {
    const result = await collection.get()
    return result.data
  } catch (err) {
    console.error(err)
    return []
  }
}