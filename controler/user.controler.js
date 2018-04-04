require('../db/model/user.model.js')
const express = require('express')
const Mongoose = require('mongoose')
const router = express.Router();
const promise = require('promise')
const _ = require('lodash')

const modelUser = Mongoose.model('user')

Mongoose.Promise = promise

let getCurrentUserInfo = function (req, res) {
  let user = req.session.user
  if (user) {
    user = _.omit(user, ['_id', '__v', 'pass', 'wx_token', 'wb_token'])
    res.status(200).send({
      code: 1,
      data: user
    })
  } else {
    res.status(200).send({
      code: 1005,
      message: '用户id错误' 
    })
  }
}

let checkNickNameExisted = function (req, res) {
  modelUser.find({nickName: req.body.nickName}).then(data => {
    if (data.length === 0) {
      res.status(200).send({
        code: 1,
        message: ''
      })
    } else {
      res.status(200).send({
        code: 1001,
        message: 'username existed'
      })
    }
  })
}

let checkEmailExisted = function (req, res) {
  console.log(req.body.email)
  modelUser.find({email: req.body.email}).then(data => {
    console.log(data)
    if (data.length === 0) {
      res.status(200).send({
        code: 1,
        message: ''
      })
    } else {
      res.status(200).send({
        code: 1002,
        message: 'email existed'
      })
    }
  })

}

let signUp = function (req, res) {
  let default_info = {
    trueName: '',
    birthday: "1980-01-01",
    school: {
      //sid: '',
      name: '未填写',
      college: '未填写',
      AdmissionYear: '未填写'
    },
    created: new Date(),
    wx_token: '',
    wb_token: '',
    type: 'peronal',
    avator: 'http://p6bztekng.bkt.clouddn.com/3255868.jpeg',
    society: [],
    follower: [],
    following: []
  }

  Object.assign(default_info, req.body)
  const user = new modelUser(default_info)

  user.save(()=>{
    req.session.user = user
    req.session.save()
    res.jsonp({
      code: 1,
      data: user
    })
  }, err => {
    res.status(400).send({
      error: error
    })
  })
}

let signIn = function (req, res) {
  console.log(req.session)
  if(req.session.user) {
    res.status(200).send({
        code: 1,
        user: req.session.user
    });
  }else{
    modelUser.find({email: req.body.email, pass: req.body.pass}).then(data => {
      if(data.length == 0){
        res.status(200).send({
          code: 1003,
          message: '用户不存在'
        })
      }else{
        req.session.user = data[0]
        req.session.save()
        res.jsonp({
          code: 1,
          data: data[0]
        })
      }
    }, err => {
      res.status(400).send({
        message: err.message
      })
    })
  }
}

let signOut = function (req, res) {
  req.session.user = null
  req.session.save()
  res.status(200).send({
    code: 1
  })
}

module.exports = {
  getCurrentUserInfo: getCurrentUserInfo,
  checkNickNameExisted: checkNickNameExisted,
  checkEmailExisted: checkEmailExisted,
  signUp: signUp,
  signIn: signIn,
  signOut: signOut
}