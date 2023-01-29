let json = {
    selectUserCardList : 
    `SELECT 
        A.user_id, A.nick_name, A.gender, A.birth, B.location_latitude, B.location_longitude 
     FROM user_profile_info A
        LEFT JOIN user_info B
        ON A.user_id = B.user_id
     WHERE NOT EXISTS (
        SELECT 'X'
        FROM like_info B
        WHERE A.user_id = B.other_user_id
          AND B.user_id = :user_id
    )
    AND NOT EXISTS (
        SELECT 'X'
        FROM hate_info B
        WHERE A.user_id = B.other_user_id
          AND B.user_id = :user_id
    )
    AND A.user_id <> :user_id
    LIMIT 49
     `,
    insertHateUser : 
    `INSERT INTO 
        hate_info (user_id, other_user_id, registration_date) 
    values 
    (:user_id,other_user_id,NOW())
    `,
    insertLikeUser :
    `INSERT INTO ruflu_lv1_like_info 
    (user_id, other_user_id, reg_dtm) 
    values 
    (:user_id,:other_user_id,NOW())
    `,
    selectNbUserlist : 
    `SELECT 
        A.user_id
        ,B.loca_latitude
        ,B.loca_longitude
        ,A.nick_name
        ,A.gender
        ,birth
        ,hei
        ,occu
        ,fancy
        ,B.distance
    FROM user_profile_info A
        JOIN 
        (
            SELECT 
                A.user_id,
                A.loca_latitude,
                A.loca_longitude,
                (6371*acos(cos(radians(?))*cos(radians(A.loca_latitude))*cos(radians(A.loca_longitude) 
                - radians(?))+sin(radians(?))*sin(radians(A.loca_latitude)))) AS distance 
            FROM user_info A
                LEFT JOIN nb_lv1_like_info B
                ON A.user_id != B.user_id
            HAVING distance <= 2 
        ) B
        ON A.user_id = B.user_id
    `,
    selectUserAlbum:
    `SELECT
        user_id
        ,image_file_path
        ,image_file_name
    FROM user_album_info
    WHERE user_id IN (
    `,
    selectLikeMeList:
    `SELECT
        A.to_user_id
        ,A.other_user_id
        ,B.nick_name
        ,B.gender
        ,B.birth
        ,C.loca_latitude
        ,C.loca_longitude
     FROM like_info A
        JOIN user_profile_info B
            ON A.to_user_id = B.user_id
        JOIN user_info C
            ON A.to_user_id = C.user_id
     WHERE A.other_user_id = :other_user_id
    `,
    insertMatchUser:
    `
    INSER INTO ruflu_lv2_like_info
    (user2_id, user1_id, reg_dtm, chg_dtm)
    VALUES
    (:userId, :toUserId, NOW(), NOW())
    `,
    selectMatchList:
    `SELECT
        A.user2_id
        ,B.nick_nm
        ,B.gender
        ,B.birth
        ,B.wei
        ,B.hei
        ,B.occu
        ,B.occu_dtl
        ,B.rlgn
        ,B.alch
        ,B.fancy
        ,B.intd
        ,B.qa1
        ,B.repl1
        ,B.qa2
        ,B.repl2
        ,B.hob
        ,C.loca_latitude
        ,C.loca_longitude
     FROM ruflu_lv2_like_info A
        LEFT JOIN user_profile_info B
            ON A.user2_id = B.user_id
        LEFT JOIN user_live_info C
            ON A.user2_id = C.user_id
     WHERE A.user1_id = ?
     UNION ALL
     SELECT
        A.user1_id
        ,B.nick_nm
        ,B.gender
        ,B.birth
        ,B.wei
        ,B.hei
        ,B.occu
        ,B.occu_dtl
        ,B.rlgn
        ,B.alch
        ,B.fancy
        ,B.intd
        ,B.qa1
        ,B.repl1
        ,B.qa2
        ,B.repl2
        ,B.hob
        ,C.loca_latitude
        ,C.loca_longitude
     FROM ruflu_lv2_like_info A
        LEFT JOIN user_profile_info B
            ON A.user1_id = B.user_id
        LEFT JOIN user_live_info C
            ON A.user1_id = C.user_id
     WHERE A.user2_id = ?
    `,
}

module.exports = json



