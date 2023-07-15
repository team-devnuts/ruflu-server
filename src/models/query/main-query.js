const json = {
  updateUserToken: `
    UPDATE user_info SET
        alarm_token = :token
        ,modification_date = NOW()
    WHERE user_id = :user_id
    `,
  updateUserLocation: `
    UPDATE user_info SET
        location_latitude = :latitude
        ,location_longitude = :longitude
    WHERE user_id = :user_id
    `,
  getAlarmTokenByUserId: `
    SELECT     
      A.alram_token
    FROM user_info A
    INNER JOIN user_profile_info b
      on A.user_id = B.user_id
    WHERE A.user_id = ?
    `,
};

module.exports = json;
