const {z} = require('zod');

const courseSchema = z.object({
    title: z.string().min(6),
    description: z.string(),
    price: z.number(),
    imageUrl: z.string(),
    published: z.boolean()
})

module.exports = {
    courseSchema
}