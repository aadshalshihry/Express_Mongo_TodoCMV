import User from '../../models/User';
import ToDo from '../../models/ToDo';

export const getUserTodos = (req, res) => {
    ToDo.find({userId: req.user._id}).exec((err, todos) => {
        if(err) res.json({err: "not found"});
        res.json({todos})
    })
};

export const createUserTodo = (req, res) => {
    const todo = new ToDo(req.body);
    todo.userId = req.user._id;
    todo.save((err, todo) => {
      if(err) return err;
      res.json({todo});
    });
};

export const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
       if(err) return next(err);
       if(!user) return next(new Error('Failed to load user:'+ id));
       req.user = user;
       next();
    });
};