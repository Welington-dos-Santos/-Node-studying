import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class dataBasePostgres {
    async list(search) {
        let videos

        if (search) {
            videos = await sql`select * from videos where title iLike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos`
        }
        return videos
    }

    async create(video) {
        const videoId = randomUUID()
        const { title, description, duration } = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video) {
        const { title, description, duration } = video

        await sql`UPDATE VIDEOS SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM VIDEOS WHERE id = ${id}`
    }
}