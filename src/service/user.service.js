// const database = require('../loaders/database');
const User = require("../models/user.model");
const config = require("../config");
const jwt = require("../gateways/jwt");
const { createClientException } = require("../exception/client-exception");
const Image = require("../models/file.model");
// const { logger } = require('../loaders/logger');

const { profileTitle } = config;

const getUsers = async (data) => {
  const user = new User(data);
  const [rows] = await User.getUsers(user);
  const result = rows.length > 0 ? await getUserListImages(rows) : rows;
  return result;
};

const getUserDetail = async (data) => {
  const user = new User(data);
  let [rows] = await User.getUser(user);
  rows = rows.length > 0 ? await getUserProfile(rows) : rows;
  rows = rows.length > 0 ? await getUserListImages(rows) : rows;
  return rows[0];
};

const addHateUser = async (data) => {
  const user = new User(data);
  const count = await User.createHateUser(user);
  return count > 0 ? "success" : "";
};

const getUserListImages = async (userList) => {
  const [rows] = await Image.getUserListImages(userList);
  const userInfo = userList.map((user) => {
    const userTemp = user;
    const imageArr = [];
    rows.forEach((userAlbum) => {
      if (userTemp.user_id === userAlbum.user_id) {
        imageArr.push({ image: userAlbum.image_file_name });
      }
    });
    userTemp.images = imageArr;
    return userTemp;
  });
  return userInfo;
};

const getUserProfile = async (userList) => {
  const [rows] = await User.getUserProfile(userList);

  const userInfo = userList.map((user) => {
    const userTemp = user;
    userTemp.detail_info = rows
      .filter((word) => word.user_id === user.user_id)
      .map((value) => {
        const detailInfo = [];
        Object.keys(profileTitle).forEach((key) => {
          detailInfo.push({
            title: profileTitle[key],
            value: value[key],
          });
        });
        return detailInfo;
      });
    return userTemp;
  });
  return userInfo;
};

const saveUserInformation = async (data) => {
  const user = new User(data);
  const result = {};

  // 핸드폰 번호 존재 유효성 검증
  const [validResult] = await User.getUserByPhoneNumber(user.login_phone_no);

  if (validResult[0].login_phone_no) {
    result.code = 403;
    result.message = "이미 존재하는 휴대폰 번호 입니다.";
    return result;
  }
  user.user_id = await User.getUserId();

  const isCompleted = await User.create(user);
  if (!isCompleted) {
    result.message = "failed";
    return result;
  }

  result.message = "success";
  return result;
};

const login = async (data) => {
  const user = new User(data);
  let result;
  // DB유저 정보랑 request 유저정보랑 비교.
  if (user.login_phone_no) {
    result = await User.getUserByPhoneNumber(user.login_phone_no);
    if (!result) createClientException(403, "등록되지 않은 핸드폰 정보");
    // return {code : "403", message: "등록되지 않은 핸드폰 정보"};
  } else if (user.kakao_id) {
    // 카카오톡 고유아이디 존재 확인
    result = await User.getUserByKakaoSerialNo(user.kakao_serial_no);
    if (!result) createClientException(403, "등록되지 않은 카카오 계정");
    // return {code : "403", message: "등록되지 않은 카카오 계정"};
  } else {
    await createClientException(403, "인증 정보 존재하지 않음");
    // return {code : "403", message: "인증 정보 존재하지 않음"};
  }

  // refreshtoken accesstoken 재발급
  const refreshToken = await jwt.publishRefreshToken(result);
  const accessToken = await jwt.publishAccessToken(refreshToken);

  return { refreshToken, accessToken };
};

exports.userService = {
  getUsers,
  addHateUser,
  getUserDetail,
  saveUserInformation,
  login,
};
