'use strict';

const utility  = require('../utility');
const keythereum = require('keythereum');
let appAddress = null;
let keyPair    = utility.createKeyPair({dump: true});


global.user_lantu = {
    email: 'zhangze.wancheng@qq.com',
    keystore: '{"address":"fd0d08f6d372d4624ca9be58c787d14a2b23e33c","crypto":{"cipher":"aes-128-ctr","ciphertext":"89a680eaf2c857c3f90e57fb7f8fe3b39bc2e95e1c46daac98c2a9bcc64b7d2d","cipherparams":{"iv":"4f73f125913ac0404a5a0eb30b38f230"},"mac":"26aace72f264c1891f3b79002be8ef2f7bde4888ac6dc1c78d3c29c3ffdbcdab","kdf":"pbkdf2","kdfparams":{"c":262144,"dklen":32,"prf":"hmac-sha256","salt":"846245aaf4c36ea6a94569a3539cc65078838efa10d0ce8cacc1707d2335fa84"}},"id":"2098a449-fa0b-412d-9c18-373b8ebab68a","version":3}',
    password: 'nopassword',
    address: 'fd0d08f6d372d4624ca9be58c787d14a2b23e33c',
    privateKey: 'bfc7dec6737cff6468f25716ff0f5adf60407f685c01eb60439e60ab473f720e',
    validMixinIds: [
        'c39c2ecc-2109-499f-b6c4-d6f278ea29fb',
        '96cb8b89-0808-427e-a58c-a04adb8119ce',
    ]

};


console.log("privatekey:");
const privatekey = keythereum.recover(user_lantu.password, JSON.parse(user_lantu.keystore));

var code = 'utf8';
//console.log(privatekey);
console.log(privatekey.toString('hex'));


/**
 * 获取 keyostore
 */
describe('get keystore', function(){
    it('should return a 200 response', function(done) {
        global.api.post(
            '/api/keystore/login'
        ).send({ payload: {
            email        : user_lantu.email,
            passwordHash : utility.hashPassword(user_lantu.email, user_lantu.password),
        } }).set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.data.length.should.equal(1);
            console.log("%s",res.text);
            done();
        });
    });
});

const hashPassword = (email, password) =>{
    const msghash = keccak256(password + email);
    return msghash;
};

/**
 * ????? APP
 
 describe('create app', () => {
     it('should return a 200', (done) => {
         const payload = {
             name        : 'Lantu APP ',
             description : 'This is a test app.',
             url         : 'http://lantu.one',
             logo        : 'http://lantu.one/logo.png',
            };
            global.api.post(
                '/api/apps'
                ).send({payload: payload}).set(
                    utility.getAuthHeader('/apps', payload, lantu_developer.keystore, lantu_developer.password)
                    ).end((err, res) => {
                        res.status.should.equal(200);
                        appAddress = res.body && res.body.data && res.body.data.app && res.body.data.app.address;
                        console.log("%s",res.text);
                        done();
                    });
                });
            });
            
            */

describe('get app information', () => {
    it('should return a 200', (done) => {
        global.api.get(
            '/api/apps/' + appAddress
        ).set(
            utility.getAuthHeader('/apps/' + appAddress, undefined, lantu_developer.keystore, lantu_developer.password)
        ).set(
            'Accept', 'application/json'
        ).expect(200, done)
        .end(function(err, res){
            res.status.should.equal(200);
            res.body.data.length.should.equal(1);
            console.log("App information:");
            console.log("%s",res.text);
            done();
        });
    });
});
/*  
describe('auth app', () => {
    it('should return a 200', (done) => {
        const appAdd  = 'c609224f9590e60fae1723ad4d612c2db1a41595';
        const key     = keyPair;
        const payload = {
            appAddress  : appAdd,
            authAddress : key.address,
            authorized  : true,
        };
        const message = utility.rollObject(payload);
        const sign    = utility.signText(message, user.keystore, user.password);
        const data    = {
            payload : payload,
            sig     : sign.sig,
        };
        // const
        global.api.post(
            '/api/apps/authenticate'
        ).send(data).expect(200, done);
    });
});
*/

