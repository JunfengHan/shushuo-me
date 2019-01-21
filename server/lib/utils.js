// 转义 html 代码
exports.encodeHtml = function(string){
    let regx_html_encode = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g
    if (typeof string == "string") {
        return string.replace(regx_html_encode, function($0){
            let c = $0.charCodeAt(0), r = ["&#"]
            // 空格(0x20)、0x00到0x20
            c = (c == 0x20) ? 0xA0 : c
            r.push(c)
            r.push(";")
            return r.join("")
        });
    }

    return false
}

exports.isEmail = (email) => {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // 设置安全邮箱限制
    const domains= ["qq.com","163.com","vip.163.com","263.net","yeah.net","sohu.com","sina.cn","sina.com","eyou.com","gmail.com","hotmail.com","42du.cn"];
    if(pattern.test(email)) {
        let domain = email.substring(email.indexOf("@")+1);
        for(let i = 0; i< domains.length; i++) {
            if(domain == domains[i]) {
                return true;
            }
        }
    }
    return false;
}

exports.isPassWord = (password) => {
    // 密码：6-16位，可以包含大小写字母、数字、特殊符号 -和_
    const pattern = /^[\w_-]{6,16}$/
    let match = false
    match = pattern.test(password)

    return match
}

exports.isPhoneNum = (phoneNum) => {
    // 校验手机号码
    const patten = /^1[34578]\d{9}$/
    let match = false
    match = patten.test(phoneNum)

    return match
}