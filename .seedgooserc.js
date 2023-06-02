module.exports = {
    //modelBaseDirectory: 'app_server/models',
    modelBaseDirectory: 'app_api/models',
    models: ['*.js', '!db.js'],
    data: 'data',
    db: 'mongodb://127.0.0.1:27017/travlr'
    //db:'mongodb://localhost:27017/travlr'
};

