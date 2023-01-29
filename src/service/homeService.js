"use strict";
const database = require(process.env.PWD + '/src/loaders/database');
const userStore = require('../models/User');
const logger = require(process.env.PWD + '/src/loaders/logger');

const getUsers = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    let [rows] = await userStore.getUsers(data);
    rows = rows.length > 0 ? await getUserListImages(rows) : {};   
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

const getUserListImages = async (userList) => {
    const [rows] = await userStore.getUserListImages(userList);
    userList.forEach(user => {
        console.log(user);
        let imageArr = new Array();
        rows.forEach(userAlbum => {
            if(user.user_id == userAlbum.user_id) {
                //imageArr.push(`${userAlbum.image_file_path}/${userAlbum.image_file_name}`);
                imageArr.push(`${userAlbum.image_file_name}`);
            }
        });
        user.images = imageArr;
    });
    return userList;
};
exports.service = {getUsers, addHateUser
    , addLikeUser, getLikeMeList
    , getUserMatchedWithMeList
    , addUserInMyMatchList}