let todos = []; // in memory space
let counterId = 0;

export async function getAllTodo (req, res, next){
    //  write here
    return res.status(202).json({
        todo: todos
    })
}

export async function createTodo (req, res, next){
    //  write here
    const {task} = req.body;
    if (!task) {
        return res.status(404).json({
            message: "Todo text required"
        });
    }

    const newTodo = {id: ++counterId, task};
    todos.push(newTodo);
    console.log(todos);
    return res.status(202).json({
        todo: newTodo
    })
}

export async function updateTodo (req, res, next){
    //  write here
    let {id} = req.params;
    let {task} = req.body;
    id = parseInt(id);

    if (!task) {
        return res.status(404).json({
            message: "Todo text required"
        });
    }

    // find Todo with id;
    let todo = null;
    for (let i=0; i<todos.length; i++) {
        if(todos[i].id === id) {
            console.log(todos[i].id);
            todo = todos[i];
            break;
        }
    }
    if (todo == null) {
        return res.status(404).json({
            message: "Todo with given id doesn't exist"
        });
    }
    todo.task = task;
    return res.status(202).json({
        message: "Todo updated",
        todo
    });
}

// export async function deleteTodo (req, res, next){
    //  write here
    
// }


export async function searchTodo(req, res, next) {
    let {q} = req.query;
    if (!q) {
        return res.status(404).json({
            message: "Please enter the parameter which you want to search"
        });
    }

    let todo = todos.filter(todo => 
        todo.task.toLowerCase().includes(q.toLowerCase())
    );
    return res.status(202).json({
        todo
    })
}


export async function deleteTodoById (req, res, next){
    //  write here
    let {id} = req.params;
    id = parseInt(id);
    const todoIndex = todos.findIndex(todo => todo.id == id);
    if (todoIndex == -1) {
        return res.status(404).json({
            message: "id doesn't exist"
        })
    }
    todos.splice(todoIndex,1);
    return res.status(202).json({
        message: todos
    });
}