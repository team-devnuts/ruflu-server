let json = {
    updateUserToken:
    `
    UPDATE user_info SET
        alarm_token = :token
        ,chg_dtm = NOW()
    WHERE user_id = :userId
    `,
    updateUserLocation:
    `
    UPDATE user_info SET
        loca_latitude = :latitude
        ,loca_longitude = :longitude
    WHERE user_id = :user_id
    `
    
};


module.exports = json;