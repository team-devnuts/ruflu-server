const mainQueryStore = require('./main-query');

function Main() {}

Main.prototype.setConnectionPool = (poolConnection) => {
    this.poolConnection = poolConnection;
};

Main.prototype.updateLocation = async (data) => {
    const count = await this.poolConnection.query(mainQueryStore.updateUserLocation, data);  
    return count;
};

Main.prototype.updateToken = async (data) => {
    const count = await this.poolConnection.query(mainQueryStore.updateUserToken, data);  
    return count;
};

module.exports = new Main();