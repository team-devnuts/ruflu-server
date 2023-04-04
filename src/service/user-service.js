"use strict";
const database = require('../loaders/database');
const userStore = require('../models/user-model');
const logger = require('../loaders/logger');
const config = require('../config');
const profileTitle = config.profileTitle;

const getUsers = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    let [rows] = await userStore.getUsers(data);  
    const result = rows.length > 0 ? await getUserListImages(rows) : rows;  
    poolConnection.release();
    return result;
};

const getUserDetail = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    let [rows] = await userStore.selectUser(data);
    rows = rows.length > 0 ? await getUserProfile(rows) : rows;
    rows = rows.length > 0 ? await getUserListImages(rows) : rows;  
    poolConnection.release();
    return rows[0];
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

const getUserListImages = async (userList) => {
    const [rows] = await userStore.getUserListImages(userList);
    userList.forEach(user => {
        let imageArr = new Array();
        rows.forEach(userAlbum => {
            if(user.user_id == userAlbum.user_id) {
                //imageArr.push(`${userAlbum.image_file_path}/${userAlbum.image_file_name}`);
                imageArr.push({"image": userAlbum.image_file_name});
            }
        });
        user.images = imageArr;
    });
    return userList;
};

const getUserProfile = async (userList) => {
    const [rows] = await userStore.getUserProfile(userList);

    userList.map((value, index, array) => {
        array[index].detail_info = 
        rows.filter(word => word.user_id == value.user_id)
            .map((value) => {
                for(const key in profileTitle){
                    return {"title" : profileTitle[key]
                            ,"value" : value[key]}   
                }
            });
    });
    return userList;
};

const saveUserInformation = async (user) => {
    const result = {message: ""};
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    //console.log(user);
    user.user_id = await userStore.getUserId();
    await poolConnection.beginTransaction();
    let [count] = await userStore.insertUser(user);
    if(!(count.affectedRows > 0)) {
        poolConnection.rollback();
        result.message = "failed";
        return result;
    }
    [count] = await userStore.insertUserProfile(user);
    await poolConnection.commit();
    //console.log(user);
    if(!(count.affectedRows > 0)) {
        poolConnection.rollback();
        result.message = "failed";
        return result;
    }
    result.message = "success"
    result.user = user;
    return result;
}

exports.userService = {
      getUsers
    , addHateUser
    , getUserDetail
    , saveUserInformation
}