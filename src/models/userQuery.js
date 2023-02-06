let json = {
    selectUserCardList : 
    `SELECT 
        A.user_id
        , A.nick_name
        , A.birth
        , B.location_latitude as latitude
        , B.location_longitude as longitude
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
    `INSERT INTO hate_info 
        (user_id, other_user_id, registeration_date) 
    values 
        (:user_id, other_user_id, NOW())
    `,
    insertLikeUser :
    `INSERT INTO like_info 
        (user_id, other_user_id, use_yn, registeration_date) 
    values 
        (:user_id,:other_user_id, '1', NOW())
    `,
    selectUserAlbum:
    `SELECT
        user_id
        ,image_file_path
        ,image_file_name
    FROM user_album_info
    WHERE user_id IN (
    `,
    selectUserProfile:
    `SELECT
        user_id
        ,height
        ,gender
        ,job
        ,fancy
        ,academy
    FROM user_profile_info
    WHERE user_id IN (
    `,
    selectLikeMeList:
    `SELECT
        A.user_id
        ,A.other_user_id
        ,B.nick_name
        ,B.gender
        ,B.birth
        ,C.location_latitude as latitude 
        ,C.location_longitude as longtitude
        ,D.image_file_name as images
     FROM like_info A
        JOIN user_profile_info B
            ON A.other_user_id = B.user_id
        JOIN user_info C
            ON A.other_user_id = C.user_id
        JOIN (
            SELECT 
                user_id
                ,image_file_name
                ,RANK() OVER(PARTITION BY user_id ORDER BY registeration_date) AS rnum
            FROM user_album_info
            WHERE use_yn = '1'
        ) D
            ON A.user_id = D.user_id
            AND rnum = '1'
     WHERE A.other_user_id = :user_id
    `,
    selectLikeMeUser:
    `SELECT
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
    selectMatchUser: 
    `SELECT
        A.user_id
        ,B.user_id
     FROM ruflu_lv1_like_info A
        JOIN ruflu_lv1_like_info B
          ON B.user_id = :userId
          AND A.to_user_id = B.user_id
     WHERE A.user_id = :userId
       AND A.user_id = B.to_user_id
    `,
    insertMatchUser:
    `
    INSERT INTO match_info
    (user_id, other_user_id, use_yn, registration_date)
    VALUES
    (:user_id, :other_user_id, '1', NOW())
    `,
    selectMatchList:
    `SELECT
        A.user_id
        ,B.nick_name
        ,B.birth
        ,C.location_latitude AS latitude
        ,C.location_longitude AS longitude
        ,D.image_file_name as images
     FROM match_info A
        LEFT JOIN user_profile_info B
            ON A.other_user_id = B.user_id
        LEFT JOIN user_info C
            ON A.other_user_id = C.user_id
        LEFT JOIN (
                SELECT 
                    user_id
                    ,image_file_name
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
        ,D.image_file_name as images
     FROM match_info A
        LEFT JOIN user_profile_info B
            ON A.user_id = B.user_id
        LEFT JOIN user_info C
            ON A.other_user_id = C.user_id
        LEFT JOIN (
                SELECT 
                    user_id
                    ,image_file_name
                    ,RANK() OVER(PARTITION BY user_id ORDER BY registeration_date) AS rnum
                FROM user_album_info
                WHERE use_yn = '1'
            ) D
            ON A.user_id = D.user_id
            AND rnum = '1'
     WHERE A.user_id = :user_id
    `,
    selectUser:
    `SELECT 
        A.user_id
        ,B.nick_name
        ,B.birth
        ,A.location_latitude AS latitude 
        ,A.location_longitude AS longitude
    FROM user_info A
        JOIN user_profile_info B
        ON A.user_id = B.user_id
    WHERE A.user_id = :user_id
    `
}

module.exports = json



