"use strict";
const database = require('../loaders/database');
const userStore = require('../models/User');
const logger = require('../loaders/logger');
const profileTitle = {
    "gender":"성별",
    "height":"키",
    "job":"직업",
    "fancy":"이상형",
    "academy":"학력"
}

const getUsers = async (data) => {
    let responseObj = {"code": "200", "message": "><"};
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    let [rows] = await userStore.getUsers(data);  
    responseObj.result = rows.length > 0 ? await getUserListImages(rows) : rows;  
    poolConnection.release();
    logger.info(responseObj.result);
    return responseObj;
};

const getUserDetail = async (data) => {
    let responseObj = {"code": "200", "message": "><"};
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    let [rows] = await userStore.selectUserDetail(data);
    //rows = rows.length > 0 ? await getUserProfile(rows) : rows;
    responseObj.result = rows.length > 0 ? await getUserListImages(rows) : rows;  
    poolConnection.release();
    return responseObj;
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
        logger.info(array[index].detail_info);
    });
    return userList;
};

exports.service = {
      getUsers
    , addHateUser
    , getUserDetail
}