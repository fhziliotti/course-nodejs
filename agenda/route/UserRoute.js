module.exports = function (app){
    let userController = app.controller.UserController;

    app.route("/user")
        .get(userController.list)
        .post(userController.insert);

    app.route("/user/:idUser")
    .get(userController.listById)
    .put(userController.update)
    .delete(userController.remove);

}