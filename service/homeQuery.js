let json = {
    getUserCardList : 
    `SELECT 
        A.user_id, A.nick_nm, A.birth 
     FROM user_profile_info A
     WHERE NOT EXISTS (
        SELECT 'X'
        FROM ruflu_lv1_like_info B
        WHERE A.USER_ID = B.to_user_id
          AND B.USER_ID = :userId
    )
    AND NOT EXISTS (
        SELECT 'X'
        FROM ruflu_hate_info B
        WHERE A.USER_ID = B.to_user_id
          AND B.USER_ID = :userId

    )
    AND USER_ID <> :userId
    LIMIT 49
     `,
    insertHateUser : 
    `INSERT INTO 
        ruflu_hate_info (USER_ID, to_user_id, reg_dtm) 
    values 
    (?,?,NOW())
    `,
    insertLikeUser :
    `INSERT INTO ruflu_lv1_like_info 
    (USER_ID, to_user_id, reg_dtm) 
    values 
    (?,?,NOW())
    `,
    selectLocInfo :
    `SELECT
        loca_latitude AS user_latitude
        ,loca_longitude AS user_longitude
     FROM user_live_info
     WHERE user_id = ?
    `,
    selectNbUserlist : 
    `SELECT 
        A.user_id
        ,B.loca_latitude
        ,B.loca_longitude
        ,A.nick_nm
        ,A.gender
        ,birth
        ,wei
        ,hei
        ,occu
        ,occu_dtl
        ,rlgn
        ,alch
        ,fancy
        ,intd
        ,qa1
        ,repl1
        ,qa2
        ,repl2
        ,hob
        ,sign_vf_st
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
            FROM user_live_info A
                LEFT JOIN nb_lv1_like_info B
                ON A.user_id != B.user_id
            HAVING distance <= 2 
        ) B
        ON A.user_id = B.user_id
    `,
    selectUserAlbum:
    `SELECT
        user_id
        ,atch_file_path_nm
    FROM user_album_info
    WHERE user_id IN (
    `,
    selectSeLv1List:
    `SELECT
        A.to_user_id
        ,A.to_user_id as user_id
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
     FROM ruflu_lv1_like_info A
        LEFT JOIN user_profile_info B
            ON A.to_user_id = B.user_id
        LEFT JOIN user_live_info C
            ON A.to_user_id = C.user_id
     WHERE A.to_user_id = ?
    `,
    selectLikeMe:
    `SELECT
        A.to_user_id
        ,A.to_user_id as user_id
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
     FROM ruflu_lv1_like_info A
        LEFT JOIN user_profile_info B
            ON A.to_user_id = B.user_id
        LEFT JOIN user_live_info C
            ON A.to_user_id = C.user_id
     WHERE A.to_user_id = ?
       AND A.user_id = ?
    `,
    selectMatchInfo: 
    `SELECT
        A.user_id
        ,B.user_id
     FROM ruflu_lv1_like_info A
        JOIN ruflu_lv1_like_info B
          ON B.user_id = ?
          AND A.to_user_id = B.user_id
     WHERE A.user_id = ?
       AND A.user_id = B.to_user_id
    `,
    insertLv2Like:
    `
    INSER INTO ruflu_lv2_like_info
    (user2_id, user1_id, reg_dtm, chg_dtm)
    VALUES
    (?, ?, NOW(), NOW())
    `,
    selectSeLv2List:
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



