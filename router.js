const express = require('express');
const router = express.Router();
const Students = require('./studentMongod')

router.get('/', function (req, res) {
  res.send('index')
})

router.get('/students', function (req, res) {
  Students.find(function (err, students) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.render('index.html', {
      fruits: [
        '苹果',
        '香蕉',
        '橘子',
        '哈密瓜'
      ],
      students: students //赋值给students，就和上面水果赋值一样
    })
  })
})
/**
 * 去添加页面路由
 */
router.get('/students/new', function (req, res) {
  res.render('new.html')
})

/**
 * 添加保存数据路由
 */
router.post('/students/new', function (req, res) {//req.body是post提交的数据，也就是该保存的数据
   new Students(req.body).save(function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

/**
 * 渲染编辑页面的路由
 */
router.get('/students/edit', function (req, res) {
  Students.findById(req.query.id, function (err,student) {
    if (err) {
      return res.status(500).send('Server error')
    }
     res.render('edit.html',{
       students: student
     })
  })
})

/**
 * 数据更新页面路由
 */
router.post('/students/edit', function (req, res) {
Students.findByIdAndUpdate(req.body.id,req.body,function (err) {
  if (err) {
    return res.status(500).send('Server error')
  }
  res.redirect('/students')
})
})

/**
 * 数据删除路由
 */
router.get('/students/delete', function (req, res) {
     Students.findByIdAndRemove(req.query.id,function (err) {
       if(err){
         return res.status(500).send('Server error')
       }
       res.redirect('/students')
     })
})
module.exports = router  //node 导出写法
