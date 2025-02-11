import app from "../../src/app"
import request from "supertest"
import { connectToDB } from "../../src/database/connect"
import mongoose from "mongoose"
import { User } from "../../src/models/User"
import { Task } from "../../src/models/Task"
import TestAgent from "supertest/lib/agent"

describe('TaskController', () => {
    let agentInstance: TestAgent;

    beforeAll(() => {
        const DB_URI = process.env.DB_URI;
        if (DB_URI) {
            connectToDB(DB_URI);
        } else {
            console.log("No DB_UDI available");
        }
    })

    beforeEach(() => {
        agentInstance = request.agent(app);
    })

    afterAll(() => {
        mongoose.disconnect();
    })

    test('should return 401 if not logged in', async () => {
        const res = await request(app).get("/tasks");
        expect(res.status).toBe(401);
    })

    test('should return 200 if logged in', async () => {
        await agentInstance.post("/auth/login").send({ username: "Rihards-B", password: "password" })
        const res = await agentInstance.get("/tasks")
        expect(res.status).toBe(200);
    })

    test('should only fetch tasks with the same groups as user', async () => {
        const loginRes = await agentInstance.post("/auth/login").send({ username: "John321", password: "password" }).expect(200);
        const tasksRes = await agentInstance.get("/tasks").expect(200);

        const user: User = loginRes.body.user;
        const tasks: Task[] = tasksRes.body;

        tasks.forEach(task => {
            if (!task.groups?.some(group => user.groups?.includes(group))) {
                throw new Error('Task with groups user does not have returned');
            }
        })
    })

    test('all tasks should be returned if user is admin', async () => {
        const loginRes = await agentInstance.post("/auth/login").send({ username: "TestUserEmptyAdmin", password: "password" }).expect(200);
        const tasksRes = await agentInstance.get("/tasks").expect(200);

        const user: User = loginRes.body.user;
        const tasks: Task[] = tasksRes.body;

        expect(user.roles).toContain("Admin");
        expect(tasks).not.toHaveLength(0);
    })

    test('a user without groups should not find any tasks', async () => {
        const loginRes = await agentInstance.post("/auth/login").send({ username: "TestUserEmpty", password: "password" }).expect(200);
        const tasksRes = await agentInstance.get("/tasks").expect(200);

        const user: User = loginRes.body.user;
        const tasks: Task[] = tasksRes.body;

        expect(user.groups).toHaveLength(0);
        expect(tasks).toHaveLength(0);
    })
})