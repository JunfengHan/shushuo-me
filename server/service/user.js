// ---> 用户相关服务
const mongoose = require('mongoose')
const User = mongoose.model('User')
const utils = require('utils')

// 用户注册
exports.addUser = (email, passWord, phoneNum) => {
    const user = new User({
        email: email,
        password: passWord,
        phoneNum: phoneNum
    })

    await user.save()
}

// TODO: 验证检验码
exports.checkCode = async (phoneNum) => {
    let match = false
}

/**
 * 检查用户信息 
 * TODO: 检查验证码是否正确
 * TODO: 防止XSS攻击
 */
exports.validateUserInfo = async (userInfo) => {
    const email = userInfo.email
    const passWord = userInfo.passWord
    const phoneNum = userInfo.phoneNum

    if (email) {
        let encodeEmail = utils.encodeHtml(email)
        utils.isEmail(encodeEmail);
    }

    if (passWord) {
        let encodepassWord = utils.encodeHtml(passWord)
        utils.isPassWord(encodepassWord);
    }

    if (phoneNum) {
        let encodePhoneNum = utils.encodeHtml(PhoneNum)
        utils.isPhoneNum(encodePhoneNum);
    }
}


// 密码检验
exports.checkPassword = async (email, password) => {
    let match = false
    const user = await User.findOne({ email })

    if (user) {
        match = await user.comparePassword(password, user.password)
    }

    return {
        match,
        user
    }
}