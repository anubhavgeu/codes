//  start writing your code from here
const {Router} = require('express');
const todoRouter = Router();
const {Todo} = require('../db');
const { TodoSchema } = require('../Schemas/todoSchema');
const { authenticateJwt } = require('../middleware/user');
todoRouter.use(authenticateJwt);

todoRouter.post('/', async(req, res) => {
    const {title, completed} = req.body;
    console.log(req.userId);
    const parsedData = TodoSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(404).json({
            message: "Enter the todos correctly"
        })
    } 
    try {
        const newTodo = await Todo.create({
            title: title,
            completed: completed,
            userId: req.userId
        });
        return res.status(200).json({
            message: "Todo created successfully",
            todo: newTodo
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error creating todo",
            error: error.message,
        });
    }
});

// get all todo;
todoRouter.get('/', async(req, res) => {
    let userId = req.userId;
    console.log(userId);
    try {
        let todos = await Todo.find({userId: userId});
        return res.status(202).json({
            message: "Fetched all the todos correctly",
            todo: todos
        });
    } catch(error) {
        return res.status(500).json({
            msg: "Error fetching todo",
            error: error.message,
        });
    }
});

todoRouter.put("/:id", async(req, res) => {
    const {id} = req.params;
    const updatedPayload = req.body;
    if (typeof updatedPayload.completed === 'undefined') {
        return res.status(400).json({
            msg: "You must provide a completed status.",
        });
    }
    try {
        await Todo.updateOne(
            {_id: id},
            {completed: updatedPayload.completed}
        )
        return res.status(202).json({
            message: "Todo marked as completed"
        });
    } catch (error) {
        return res.status(404).json({
            message: "Unable to update todo",
            error: error.message
        })
    }

})

module.exports = {
    todoRouter: todoRouter
}