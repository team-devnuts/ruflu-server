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



