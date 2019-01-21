const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 *1000

const userSchema = new Schema({
    userName: {
        unique: true,
        required: true,
        type: String
    },
    email: {
        unique: true,
        required: true,
        type: String
    },
    passWord: {
        required: true,
        type: String
    },
    phoneNum: {
        required: true,
        type: Number
    },
    lockUntil: Number,
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
})

// ---> 增加虚拟字段，不会保存到数据库
userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now())
})

userSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

// ---> 密码中间件给密码加盐生成新密码
userSchema.pre('save', function (next) {
    if (!this.isModified('passWord')) return next()

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, hash) => {
        if (err) return next(err)

        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) return next(error)

            this.passWord = hash
            next()
        })
    })

    next()
})

userSchema.methods = {
    comparePassword: function (_password, passWord) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, passWord, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    },

    incLoginAttempts: function (user) {
        return new Promise((resolve, reject) => {
            if (this.lockUntil && this.lockUntil < Date.now()) {
                this.update({
                    $set: {
                        loginAttempts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                })
            } else {
                let updates = {
                    $inc: {
                        loginAttempts: 1
                    }
                }

                if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
                    updates.$set = {
                        lockUntil: Date.now() + LOCK_TIME
                    }
                }

                this.update(updates, err => {
                    if (!err) resolve(true)
                    else reject(err)
                })
            }
        })
    }
}

mongoose.model('User', userSchema)