let json = {
    updateUserToken:
    `
    UPDATE user_info SET
        alarm_token = ?
        ,chg_dtm = NOW()
    WHERE user_id = ?
    `,
    updateUserLoca:
    `
    UPDATE user_live_info SET
        loca_latitude = ?
        ,loca_longitude = ?
    WHERE user_id = ?
    `
}

module.exports = json