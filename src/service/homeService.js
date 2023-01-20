"use strict";
const database = require(process.env.PWD + '/src/loaders/database');
const userStore = require('../models/User');
const logger = require(process.env.PWD + '/src/loaders/logger');

const getCards = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection)
    let [rows] = await userStore.getUserList(data);
    rows = rows.length > 0 ? await getCardImages(rows) : {};   
    poolConnection.release();
    return rows;
};

const addHateUser = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    await poolConnection.beginTransaction();
    const count = await userStore.insertHateUser(data);
    await poolConnection.commit();
    poolConnection.release();
    return count > 0 ? "success" : "";
};

const addLikeUser = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    poolConnection.beginTransaction();
    const result = await userStore.insertLikeUser(data)
    .then(async data => {
        let result = {};
        if(count > 0) return result = {sucess:false};
        count [rows] = userStore.selectLikeMeUser(data);

        if(rows.length > 0) {
            await userStore.insertMatchUser(data);
            result = {sucess:true, alarm : "match"}
        } else {
            result = {sucess:true, alarm : "like"}
        }
        return result;
    });
    await poolConnection.commit();
    poolConnection.release();  
    return result;
};

const getLikeMeList = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    let [rows] = await userStore.selectLikeMeList(data);
    rows = rows.length >0 ? await getCardImages(rows) : {};
    poolConnection.release();
    return rows;
};

const getUserMatchedWithMeList = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    const rows = await userStore.selectMatchList(data);
    poolConnection.release();
    return rows;
};

const addUserInMyMatchList = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    await poolConnection.beginTransaction();
    const result = await userStore.insertMatchUser(data);
    await poolConnection.commit();
    poolConnection.release();
    return result > 0 ? "success" : "";
}

const getCardImages = async (userList) => {
    const [rows] = await userStore.selectUserListImages(userList);
    userList.forEach(user => {
        console.log(user);
        let imageArr = new Array();
        rows.forEach(userAlbum => {
            if(user.user_id == userAlbum.user_id) {
                imageArr.push(userAlbum.atch_file_path_nm);
            }
        });
        user.images = imageArr;
    });
    return userList;
};
exports.service = {getCards, addHateUser
    , addLikeUser, getLikeMeList
    , getUserMatchedWithMeList
    , addUserInMyMatchList}