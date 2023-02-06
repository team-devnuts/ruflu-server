"use strict";
const database = require('../loaders/database');
const userStore = require('../models/User');



const getLikeMeList = async (data) => {
    let responseObj = {"code": "200", "message": "><"};
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    let [rows] = await userStore.selectLikeMeList(data);
    //rows = rows.length >0 ? await getCardImages(rows) : {};
    rows.forEach(user => {
        user.images = [{"image" : user.images}];
    });
    responseObj.result = rows;
    poolConnection.release();
    return responseObj;
};

const addLikeUser = async (data) => {
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    poolConnection.beginTransaction();
    const count = await userStore.insertLikeUser(data)
    
    let result = {};

    if(count > 0) return result = {sucess:false};
    const [rows] = await userStore.selectLikeMeUser(data);

    if(rows.length > 0) {
        await userStore.insertMatchUser(data);
        result = {sucess:true, alarm : "match"};
    } else {
        result = {sucess:true, alarm : "like"};
    }
    
    await poolConnection.commit();
    poolConnection.release();  

    return result;
};

const getUserMatchedWithMeList = async (data) => {
    let responseObj = {"code": "200", "message": "><"};
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    const [rows] = await userStore.selectMatchList(data);
    rows.forEach(user => {
        user.images = [{"image" : user.images}];
    });
    responseObj.result = rows;
    poolConnection.release();
    return responseObj;
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



exports.service = {
      getLikeMeList
    , addLikeUser
    , getUserMatchedWithMeList
    , addUserInMyMatchList
}