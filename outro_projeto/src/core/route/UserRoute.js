module.exports = function (app){
    let userController = app.src.api.user.UserController;

    app.route("/user")
        .get(userController.list);

    app.route("/user/:idUser")
    .get(userController.listById);

}