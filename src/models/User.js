'use strict';
const mysql = require('mysql');
const userQueryStore = require(process.env.PWD + '/src/models/userQuery');

function User() {
    
}
User.prototype.setConnectionPool = (poolConnection) => {
    this.poolConnection = poolConnection;
};
User.prototype.getUserList = async (data) => {
    //const connection = await pool.getConnection(async conn => conn);
    const result = this.poolConnection.query(userQueryStore.selectUserCardList, data);
    return result;
}
User.prototype.selectUserListImages = async (data) => {
    let query = userQueryStore.selectUserAlbum;
    for (const key in data) {
        query += "?"
        data[key] = data[key].user_id
        if(key != (data.length-1))
            query += ","
        else query += ""
    }
    query += ")";
    query = mysql.format(query, data);
    const result = await this.poolConnection.query(query);
    return result;
}
User.prototype.insertHateUser = async (data) => {
    const count = await this.poolConnection.query(userQueryStore.insertHateUser, data);
    return count;
}
User.prototype.insertLikeUser = async (data) => {
    const count = await this.poolConnection.query(userQueryStore.insertLikeUser, data);
    return count;
}
User.prototype.insertMatchUser = async (data) => {

    const count = await this.poolConnection.query(userQueryStore.insertMatchUser, data);
    return count;
}
User.prototype.selectLikeMeUser = async(data) => {
    const result = await this.poolConnection.query(userQueryStore.selectLikeMeUser, data);
    return result;
}
User.prototype.selectLikeMeList = async (data) => {
    const result = await this.poolConnection.query(userQueryStore.selectLikeMeList, data);   
    return result;
}
User.prototype.selectMatchList = async (data) => {
    const result = await this.poolConnection.query(userQueryStore.selectMatchList, data);
    return result;
}

module.exports = new User();