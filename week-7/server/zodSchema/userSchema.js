const {z} = require('zod');

const userSchema = z.object({
    username: z.string().min(8),
    password: z.string().min(8)
});

module.exports = {
    userSchema
}