'use strict';
const mysql = require('mysql');
const userQueryStore = require('./userQuery');

function User() {}

User.prototype.setConnectionPool = (poolConnection) => {
    this.poolConnection = poolConnection;
};

User.prototype.getUsers = async (data) => {
    return this.poolConnection.query(userQueryStore.selectUserCardList, data);
};

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
};

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
};

User.prototype.insertHateUser = async (data) => {
    const count = await this.poolConnection.query(userQueryStore.insertHateUser, data);
    return count;
};

User.prototype.insertLikeUser = async (data) => {
    const count = await this.poolConnection.query(userQueryStore.insertLikeUser, data);
    return count;
};

User.prototype.insertMatchUser = async (data) => {
    const count = await this.poolConnection.query(userQueryStore.insertMatchUser, data);
    return count;
};

User.prototype.selectLikeMeUser = async (data) => {
    return await this.poolConnection.query(userQueryStore.selectLikeMeUser, data);
};

User.prototype.selectLikeMeList = async (data) => {
    const result = await this.poolConnection.query(userQueryStore.selectLikeMeList, data);   
    return result;
};

User.prototype.selectMatchList = async (data) => {
    const result = await this.poolConnection.query(userQueryStore.selectMatchList, data);
    return result;
};

User.prototype.selectUser = async (data) => {
    return await this.poolConnection.query(userQueryStore.selectUser, data);
}

module.exports = new User();