const config = require("../../config");

const { IMAGE_BASE_PATH } = config;
const json = {
  insertLikeUser: `INSERT INTO like_info 
        (user_id, other_user_id, use_yn, registeration_date) 
    values 
        (:user_id,:other_user_id, '1', NOW())
    `,
  selectLikeMeList: `SELECT
        A.user_id
        ,A.other_user_id
        ,B.nick_name
        ,B.gender
        ,B.birth
        ,C.location_latitude as latitude 
        ,C.location_longitude as longtitude
        ,D.image_url_path as image
     FROM like_info A
        JOIN user_profile_info B
            ON A.other_user_id = B.user_id
        JOIN user_info C
            ON A.other_user_id = C.user_id
        JOIN (
            SELECT 
                user_id
                ,'${IMAGE_BASE_PATH}' || image_file_name || '.' || ext as image_url_path
                ,RANK() OVER(PARTITION BY user_id ORDER BY registeration_date) AS rnum
            FROM user_album_info
            WHERE use_yn = '1'
        ) D
            ON A.user_id = D.user_id
            AND rnum = '1'
     WHERE A.other_user_id = :user_id
    `,
  selectLikeMeUser: `SELECT
        A.other_user_id as user_id
        ,B.nick_name
        ,B.birth
        ,C.location_latitude as latitude
        ,C.location_longitude as longitude
     FROM like_info A
        LEFT JOIN user_profile_info B
            ON A.other_user_id = B.user_id
        LEFT JOIN user_info C
            ON A.other_user_id = C.user_id
     WHERE A.other_user_id = :user_id
       AND A.user_id = :other_user_id
    `,
  insertMatchUser: `
    INSERT INTO match_info
    (user_id, other_user_id, use_yn, registration_date)
    VALUES
    (:user_id, :other_user_id, '1', NOW())
    `,
  selectMatchUser: `SELECT
        A.user_id
        ,B.user_id
     FROM ruflu_lv1_like_info A
        JOIN ruflu_lv1_like_info B
          ON B.user_id = :userId
          AND A.to_user_id = B.user_id
     WHERE A.user_id = :userId
       AND A.user_id = B.to_user_id
    `,
  selectMatchList: `SELECT
        A.user_id
        ,B.nick_name
        ,B.birth
        ,C.location_latitude AS latitude
        ,C.location_longitude AS longitude
        ,D.image_url_path as image
     FROM match_info A
        LEFT JOIN user_profile_info B
            ON A.other_user_id = B.user_id
        LEFT JOIN user_info C
            ON A.other_user_id = C.user_id
        LEFT JOIN (
                SELECT 
                    user_id
                    ,'${IMAGE_BASE_PATH}' || image_file_name || '.' || ext as image_url_path
                    ,RANK() OVER(PARTITION BY user_id ORDER BY registeration_date) AS rnum
                FROM user_album_info
                WHERE use_yn = '1'
            ) D
            ON A.other_user_id = D.user_id
            AND rnum = '1'
     WHERE A.other_user_id = :user_id
     UNION ALL
     SELECT
        A.other_user_id AS user_id
        ,B.nick_name
        ,B.birth
        ,C.location_latitude AS latitude
        ,C.location_longitude AS longitude
        ,D.image_url_path as images
     FROM match_info A
        LEFT JOIN user_profile_info B
            ON A.user_id = B.user_id
        LEFT JOIN user_info C
            ON A.other_user_id = C.user_id
        LEFT JOIN (
                SELECT 
                    user_id
                    ,'${IMAGE_BASE_PATH}' || image_file_name || '.' || ext as image_url_path
                    ,RANK() OVER(PARTITION BY user_id ORDER BY registeration_date) AS rnum
                FROM user_album_info
                WHERE use_yn = '1'
            ) D
            ON A.user_id = D.user_id
            AND rnum = '1'
     WHERE A.user_id = :user_id
    `,
};

module.exports = json;
