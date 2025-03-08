const {z} = require('zod');

const todoSchema = z.object({
    title: z.string().min(8).max(25),
    completed: z.boolean()
});

module.exports = {
    TodoSchema: todoSchema
}