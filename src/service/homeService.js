"use strict";
const database = require(process.env.PWD + '/src/loaders/database');
const homeQueryStore = require(process.env.PWD + '/src/service/homeQuery');
const logger = require(process.env.PWD + '/src/loaders/logger');

const getCards = async (data) => {
    let query = homeQueryStore.getUserCardList;
    const poolConnection = await database.getPoolConection();
    let [rows] = await poolConnection.query(query, data);

    logger.info(`getUserCardList : ${rows}`);
    
    rows = rows.length >0 ? await getCardImages(rows) : '';
    poolConnection.release();
    return rows;
}

const getCardImages = async function(userList) {
    let query = rufluQuery.selectUserAlbum;
    let data = [];

    for (const key in userList) {
        query += "?"
        data[key] = userList[key].user_id
        if(key != (userList.length-1))
            query += ","
        else query += ""
    }
    query += ")"
    query = mysql.format(query, data)
    const poolConnection = await db.getPoolConection();
    const [rows] = await poolConnection.query(query);
    userList.forEach(user => {
        let imgs = new Array();
        
        rows.forEach(userAlbum => {
            if(user.user_id == userAlbum.user_id) {
                imgs.push(userAlbum.atch_file_path_nm);
            }
        });
        user.imgs = imgs;
    });
}
exports.service = {getCards}