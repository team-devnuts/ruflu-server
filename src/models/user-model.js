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
    const count = await this.poolConnection.query(userQueryStore.insertHateUser, data);
    return count;
}

User.prototype.selectUser = async (data) => {
    return await this.poolConnection.query(userQueryStore.selectUser, data);
}

User.prototype.insertUser = async (user) => {
    return await this.poolConnection.query(userQueryStore.insertUser, user);
}

User.prototype.getUserId = async () => {
    const [row, fields] = await this.poolConnection.execute(userQueryStore.selectUserIdSequence, ['user_info_sequence']);
    const [result] = await this.poolConnection.execute(userQueryStore.selectUserId);
    
    return result[0].user_id;
}

User.prototype.insertUserProfile = async (user) => {
    return await this.poolConnection.query(userQueryStore.insertUserProfile, user);
}

module.exports = new User();