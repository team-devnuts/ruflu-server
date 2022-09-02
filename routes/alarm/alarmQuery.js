let json = {
    getUserAlarmToken : 
    `
    SELECT     
        A.alarm_token, 
        B.nick_nm 
    FROM user_info A
    INNER JOIN user_profile_info B
    on A.USER_ID = B.USER_ID
    WHERE A.USER_ID = ?
    `
}

module.exports = json