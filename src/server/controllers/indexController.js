import User from '../models/User';
import ToDo from '../models/ToDo';

export const index = (req, res) => {
    ToDo.find({}).exec((err, todos)=> {
        console.log(todos);
        res.render('index', {
            title: "New Express",
            todos: todos
        });
    });
};