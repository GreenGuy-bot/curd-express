const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/studentTest', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});
/**
 *表架构
 */
const studentSchema = new Schema({
  name:{
    type:String,
    require:true
  },
  age:{
    type:Number,
  },
  gender:{
    type:Number,
    enum:[0,1],
    default:0
  },
  hobbies:{
    type:String
  }
})
/**
 * method 是给 document 用的，一定要在添加原型前面
 */
// schema.methods.speak = function () {
//   const greeting = this.username
//     ? "Meow name is " + this.username
//     : "I don't have a name";
//   console.log(greeting);
// }

module.exports = mongoose.model('Student', studentSchema);//返回值模型构造函数,User使用schema模板

//给数据赋值,admin是一个对象，拥有以下属性
// const admin = new User({
//   username: '张三八',
//   password: '1234567',
//   email:'985976887@qq.com'
// })

/**
 * 保存到数据库中
 */
// admin.save(function (err, admin) {
//   if (err) return console.error(err);
//   console.log('保存成功')
//   console.log(admin);
//   admin.speak()
// });
//
/**
 * 查询所有数据
 */
// User.find(function (err,ret) {
//   if(err) return console.error(err);
//   console.log('查询的结果'+ ret);
// })
/**
 *查询特定数据
 */
// User.findOne({password:'123456'},function (err,ret) {
//   if(err) return console.error(err);
//   console.log('查询的结果'+ ret);
// })

/**
 *promise实现增删改查
 */
// User.findOne({
//   username: "张三"
// }).then(res => {
//   if (res) {
//     console.log('用户已存在');
//   } else {
//     return new User({  //return一个新的对象
//       username: '帅逼',
//       password: '7777777',
//       email: '990213@qq.com'
//     })
//   }
// }).then(res => { //res为上方return的对象
//   res.save(function (err, admin) {
//     if (err) return console.error(err);
//     console.log('保存成功')
//     console.log(admin);
//   })
// })
/**
 * 删除数据
 */
// User.remove({password:'123456'},function (err,ret) {
//   if(err) return console.error(err);
//   console.log('删除成功')
//   console.log(ret);
// })
/**
 * 通过ID找到某条数据并更新
 */
// User.findByIdAndUpdate('5f4e15160d069d3758867daa',{password:'123456789'},
//   function (err,ret) {
//   if(err) return console.error(err);
//     console.log('修改成功');
//   })