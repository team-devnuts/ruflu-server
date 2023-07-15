const json = {
  selectUserCardList: `SELECT 
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
  insertHateUser: `INSERT INTO hate_info 
        (user_id, other_user_id, registeration_date) 
    values 
        (:user_id, other_user_id, NOW())
    `,
  selectUserProfile: `SELECT
        user_id
        ,height
        ,gender
        ,job
        ,fancy
        ,academy
    FROM user_profile_info
    WHERE user_id IN (
    `,
  selectUser: `SELECT 
        A.user_id
        ,B.nick_name
        ,B.birth
        ,A.location_latitude AS latitude 
        ,A.location_longitude AS longitude
    FROM user_info A
        JOIN user_profile_info B
        ON A.user_id = B.user_id
    WHERE A.user_id = :user_id
    `,
  insertUser: `
    INSERT INTO user_info
    (
        user_id
        , login_phone_no
        , login_method
        , use_yn
        , registeration_date
        , modification_date
    )
    VALUES
    (
        :user_id
        , :phone_number
        , :login_method
        , '1'
        , now()
        , now()
    )
    `,
  insertUserProfile: `
    INSERT INTO user_profile_info
    (
        user_id
        , nick_name
        , gender
        , birth
        , height
        , job
        , fancy
        , registration_date
        , modification_date
        , academy
    )
    VALUES
    (
        :user_id
        , :nick_name
        , :gender
        , :birth
        , :height
        , :job
        , :fancy
        , now()
        , now()
        , :academy
    )
    `,
  selectUserIdSequence: `
    CALL get_nextval(?, @result)
    `,
  selectUserId: `
    SELECT CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%h%i'), LPAD(@result, '6', '0')) AS user_id FROM dual;
    `,
  selectUserByPhoneNumber: `
    SELECT 
        user_id
        ,login_phone_no
    FROM user_info
    WHERE login_phone_no = :phone_number
    `,
  selectUserByKaKaoSerialNo: `
    SELECT

    FROM user_info
    WHERE kakao_serial_no = :kakao_serial_no
    `,
  updateSocketId: `
  UPDATE user_info SET socket_id = :socket_id
  WHERE user_id = :user_id
  `,
};

module.exports = json;
