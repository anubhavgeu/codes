const {z} = require('zod');

const userSchema = z.object({
    username: z.string().min(8).max(20).email(),
    password: z.string().min(8).max(20)
});

module.exports = {
    userSchema: userSchema
}