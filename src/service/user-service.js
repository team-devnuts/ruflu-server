"use strict";
const database = require('../loaders/database');
const userStore = require('../models/user-model');
const logger = require('../loaders/logger');
const config = require('../config');
const jwt = require('../gateways/jwt');
const ClientException = require('../exception/client-exception');
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
    const result = {};
    const poolConnection = await database.getPoolConection();
    userStore.setConnectionPool(poolConnection);
    
    // 핸드폰 번호 존재 유효성 검증
    const [validResult] = await userStore.getUserByPhoneNumber(user.phone_number);
    if(validResult[0].login_phone_no) {
        result.code = 403;
        result.message = "이미 존재하는 휴대폰 번호 입니다.";
        return result;
    }
    user.user_id = await userStore.getUserId();
    await poolConnection.beginTransaction();

    let count = await userStore.insertUser(user);
    if(!(count > 0)) {
        poolConnection.rollback();
        result.message = "failed";
        return result;
    }

    count = await userStore.insertUserProfile(user);
    await poolConnection.commit();
    
    if(!(count > 0)) {
        poolConnection.rollback();
        result.message = "failed";
        return result;
    }
    
    result.message = "success";
    
    return result;
}

const login = async (body) => {
    let user;
    // DB유저 정보랑 request 유저정보랑 비교.    
    if(body.phone_number) { 
        user = await userStore.getUserByPhoneNumber(body.phone_number);
        if(!user) new ClientException(403, "등록되지 않은 핸드폰 정보");
        
        //return {code : "403", message: "등록되지 않은 핸드폰 정보"};
    } else if(body.kakao_id) {
        // 카카오톡 고유아이디 존재 확인
        user = await userStore.getUserByKakaoSerialNo(body.kakao_serial_no);
        if(!user) new ClientException(403, "등록되지 않은 카카오 계정");
        //return {code : "403", message: "등록되지 않은 카카오 계정"};
    } else {
        new ClientException(403, "인증 정보 존재하지 않음");
        //return {code : "403", message: "인증 정보 존재하지 않음"};
    }   
    
    // refreshtoken accesstoken 재발급
    const refreshToken = await jwt.publishRefreshToken(user);
    const accessToken = await jwt.publishAccessToken(refreshToken);

    return {refreshToken, accessToken};
}

exports.userService = {
      getUsers
    , addHateUser
    , getUserDetail
    , saveUserInformation
    , login
}