const {z} = require('zod');

const adminSchema = z.object({
    username: z.string().min(8).max(20),
    password: z.string().min(8).max(20)
});

module.exports = {
    adminSchema
}