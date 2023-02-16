const mysql = require('mysql');
const someQueryStore = require('./some-query');

class Some {

    constructor(poolConnection) {
        this.poolConnection = poolConnection;
    }
    
    async insertLikeUser(data) {
        const count = await this.poolConnection.query(someQueryStore.insertLikeUser, data);
        return count;
    }

    async selectLikeMeUser(data) {
        return await this.poolConnection.query(someQueryStore.selectLikeMeUser, data);
    }

    async selectLikeMeList(data) {
        const result = await this.poolConnection.query(someQueryStore.selectLikeMeList, data);   
        return result;
    }

    async insertMatchUser(data) {
        const count = await this.poolConnection.query(someQueryStore.insertMatchUser, data);
        return count;
    }

    async selectMatchList(data) {
        const result = await this.poolConnection.query(someQueryStore.selectMatchList, data);
        return result;
    }

}

exports.Some = Some;