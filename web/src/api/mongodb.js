import { mongoDB } from "./api";

export const fetchTasks = async () => {

    const response = await mongoDB.get('/tasks');

    return response.data;

};

export const postTask = async (data) => {

    const response = await mongoDB.post(`/tasks`, data);

    return response;

};

export const fetchSkills = async () => {

    const response = await mongoDB.get('/skills');

    return response.data;

};

export const postSkill = async (data) => {

    const response = await mongoDB.post(`/skills`, data);

    return response;

};

export const updateSkill = async () => {

    const response = await mongoDB.patch(`/skills/6259fae42a25d0e1a672ba78`);

    return response;

};

export const changeSkillName = async (data) => {

    const response = await mongoDB.patch(`/skills/name/6259fae42a25d0e1a672ba78`, data);

    return response;

};

export const deleteSkillName = async () => {

    const response = await mongoDB.delete(`/skills/625a03de342f03cd1ac02b18`);

    return response;

};