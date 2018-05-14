import {getUserTodos, userById, createUserTodo} from "../../controllers/api/apiTodoController";

const router = (app) => {
    const prefix = "/api/auth";

    // API Todo
    app.get(`${prefix}/user_todos/:userId`, getUserTodos);

    app.post(`${prefix}/create_todo/:userId`, createUserTodo);


    app.param('userId', userById);

};


export default router;