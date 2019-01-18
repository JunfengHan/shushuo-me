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
        var isEmail = function (val) {
            var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var domains= ["qq.com","163.com","vip.163.com","263.net","yeah.net","sohu.com","sina.cn","sina.com","eyou.com","gmail.com","hotmail.com","42du.cn"];
            if(pattern.test(val)) {
                var domain = val.substring(val.indexOf("@")+1);
                for(var i = 0; i< domains.length; i++) {
                    if(domain == domains[i]) {
                        return true;
                    }
                }
            }
            return false;
        }
        // 输出 true
        isEmail("cn42du@163.com");
        
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