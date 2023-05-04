'use strict';
const mysql = require('mysql');
const userQueryStore = require('./user-query');

function User() {}

User.prototype.setConnectionPool = (poolConnection) => {
    this.poolConnection = poolConnection;
}

User.prototype.getUsers = async (data) => {
    return this.poolConnection.query(userQueryStore.selectUserCardList, data);
}

User.prototype.getUserListImages = async (data) => {
    let query = userQueryStore.selectUserAlbum;
    let bindData = [];
    for (const key in data) {
        query += "?"
        bindData[key] = data[key].user_id
        if(key != (data.length-1))
            query += ","
        else query += ""
    }
    query += ")";
    query = mysql.format(query, bindData);
    const result = await this.poolConnection.query(query);
    return result;
}

User.prototype.getUserProfile = async (data) => {
    let query = userQueryStore.selectUserProfile;
    let bindData = [];
    for (const key in data) {
        query += "?"
        bindData[key] = data[key].user_id
        if(key != (data.length-1))
            query += ","
        else query += ""
    }
    query += ")";
    query = mysql.format(query, bindData);
    const result = await this.poolConnection.query(query);
    return result;
}

User.prototype.insertHateUser = async (data) => {
    const [result] = await this.poolConnection.query(userQueryStore.insertHateUser, data);
    return result.affectedRows;
}

User.prototype.selectUser = async (data) => {
    return await this.poolConnection.query(userQueryStore.selectUser, data);
}

User.prototype.insertUser = async (user) => {
    const [result] = await this.poolConnection.query(userQueryStore.insertUser, user);
    return result.affectedRows;
}

User.prototype.getUserId = async () => {
    const [row, fields] = await this.poolConnection.execute(userQueryStore.selectUserIdSequence, ['user_info_sequence']);
    const [result] = await this.poolConnection.execute(userQueryStore.selectUserId);
    
    return result[0].user_id;
}

User.prototype.insertUserProfile = async (user) => {
    const [result] = await this.poolConnection.query(userQueryStore.insertUserProfile, user);
    return result.affectedRows;
}

User.prototype.getUserByPhoneNumber = async (phoneNumber) => {
    return await this.poolConnection.query(userQueryStore.selectUserByPhoneNumber, {"phone_number": phoneNumber});
}

User.prototype.getUserByKakaoSerialNo = async (kakaoSerialNo) => {
    return await this.poolConnection.query(userQueryStore.selectUserByKaKaoSerialNo, {"kakao_serial_no": kakaoSerialNo});
}

module.exports = new User();