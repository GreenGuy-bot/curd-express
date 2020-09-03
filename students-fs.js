/**
 * 数据操作文件模块
 */
const fs = require('fs')

const DbPath = './db.json'
/**
 * 获取学生列表
 */
exports.find = function (callback) {
  fs.readFile(DbPath, 'utf-8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students) //null是err参数，要保证系统能分清err和data的区别
  })
}

/**
 * 通过ID获取单个数据
 */
exports.findById = function (id,callback) {
  fs.readFile(DbPath, 'utf-8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students  //null是err参数，要保证系统能分清err和data的区别
    let stu = students.find(item => item.id === parseInt(id) )//只有一行可以去大括号和return,这个id是传进来的id
    callback(null,stu)
  })
}

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
  fs.readFile(DbPath, 'utf-8', function (err,data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students

    student.id = students[students.length - 1].id + 1 //保证添加的一定是最后一位id不重复

    students.push(student) //将传进来的对象传到数组中

    let fileData = JSON.stringify({students: students})//把数组转成字符串存到fileData中
    fs.writeFile(DbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null) //回调函数,err为null就为false，执行下面的函数（重定向）
    })//把ret写入数据中
  })

}

/**
 * 更新学生
 */
exports.update = function (student, callback) {
  fs.readFile(DbPath, 'utf-8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students  //null是err参数，要保证系统能分清err和data的区别
    student.id = parseInt(student.id)
    let stu = students.find(item => item.id === student.id)//只有一行可以去大括号和return
    for(let key in student){
      stu[key] = student[key]
    }
    let fileData = JSON.stringify({students: students})//把数组转成字符串存到ret中
    fs.writeFile(DbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null) //回调函数,err为null就为false，执行下面的函数（重定向）
    })//把ret写入数据中
  })
}

/**
 * 删除学生
 */
exports.delete = function (id,callback) {
  fs.readFile(DbPath, 'utf-8', function (err, data) {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students  //null是err参数，要保证系统能分清err和data的区别
    // let stu = students.find(item => item.id === parseInt(id) )//只有一行可以去大括号和return,这个id是传进来的id
        students.splice(id-1,1)
        for(let i=0;i<students.length;i++){
          students[i].id=i+1
    }
    let fileData = JSON.stringify({students: students})//把数组转成字符串存到fileData中
    fs.writeFile(DbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null) //回调函数,err为null就为false，执行下面的函数（重定向）
    })//把ret写入数据中
})
}