import { api, mongoDB } from "./api";

const userId = Number(localStorage.getItem('userId'))

export const fetchProfile = async () => {

    const response = await api.get('/profile');

    return response.data;

};

export const fetchUser = async () => {

    const response = await mongoDB.get('/profile');

    return response.data;

};

export const fetchTasks = async () => {

    const response = await mongoDB.get('/tasks');

    return response.data;

};

export const fetchAddresses = async () => {

    const response = await mongoDB.get(`/userData/${userId}/addresses`);

    return response.data;

};

export const postAddresses = async (values) => {

    const response = await mongoDB.post(`/userData/${userId}/addresses`, values);
    console.log("response", response)

    return response;

};

export const postTask = async (data) => {

    const response = await mongoDB.post(`/tasks`, data);

    return response;

};

export const updatePostTask = async (id) => {

    const response = await mongoDB.patch(`/tasks/${id}`, { userId: userId, completed: "true" });

    return response;

};

export const deletePostTask = async (id) => {

    const response = await mongoDB.delete(`/tasks/${id}`);

    return response;

};

export const fetchSkills = async () => {

    const response = await mongoDB.get('/skills');

    return response.data;

};

export const fetchSkill = async (id) => {

    const response = await mongoDB.get(`/skills/${id}`);

    return response.data;

};

export const addSkillPost = async (name) => {

    const response = await mongoDB.post(`/skills`, { userId: userId, name: name, level: 1, exp: 0, maxExp: 1000 });

    return response;

};


export const updateSkillLevelPost = async (id) => {

    const getSkillData = await api.get(`/skills/${id}`);
    const newExp = getSkillData.data.exp + 400

    const newTasksCount = getSkillData.data.tasksCompleted + 1

    if (newExp >= getSkillData.data.maxExp) {
        const newLevel = getSkillData.data.level + 1
        const newMaxEpx = 1000 * newLevel

        await api.patch(`/skills/${id}`, { userId: userId, level: newLevel });
        await api.patch(`/skills/${id}`, { userId: userId, exp: 200, maxExp: newMaxEpx, tasksCompleted: newTasksCount });
    } else {
        await api.patch(`/skills/${id}`, { userId: userId, exp: newExp, tasksCompleted: newTasksCount });
    }

};

export const deletePostSkill = async (id) => {

    const response = await mongoDB.delete(`/skills/${id}`);

    return response;

};

export const updateUserLevelPost = async (id) => {

    const getUserData = await api.get(`/users/${id}`);
    const newExp = getUserData.data.exp + 400

    if (newExp >= getUserData.data.maxExp) {
        const newLevel = getUserData.data.level + 1
        const newMaxEpx = 1000 * newLevel

        await api.patch(`/users/${id}`, { userId: userId, level: newLevel });
        await api.patch(`/users/${id}`, { userId: userId, exp: 200, maxExp: newMaxEpx });
    } else {
        await api.patch(`/users/${id}`, { userId: userId, exp: newExp });
    }

};

export const registerPost = async (values) => {

    const response = await mongoDB.post('/register', values);

    localStorage.setItem("userToken", response.data.accessToken)

    return response.data;

};


export const loginPost = async (values) => {

    const response = await mongoDB.post('/login', values);

    console.log(response)

    localStorage.setItem("userToken", response.data.access_token)
    localStorage.setItem("userId", response.data.result.id)

    return response.data;

};