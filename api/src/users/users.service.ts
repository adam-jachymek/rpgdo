import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { User } from './user.module';


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModule: Model<User>) { }

    async getSingleUser(email: string) {
        let user;
        try {
            user = await this.userModule.findOne({ email: email }).exec()
        } catch (error) {
            throw new NotFoundException('Error')
        }

        if (!user) {
            throw new NotFoundException('Could not find user')
        }

        return { id: user.id, email: user.email, password: user.password }
    }

    async insertUser(email: string, password: string) {
        const newUser = new this.userModule({ email: email, password: password })
        const result = await newUser.save()
        return result.id as string;
    }

    async getUserById(id: string) {
        let user;
        try {
            user = await this.userModule.findOne({ id: id }).exec()
        } catch (error) {
            throw new NotFoundException('Error')
        }

        if (!user) {
            throw new NotFoundException('Could not find user')
        }

        return user.id
    }

    async addTask(userId: string, taskId: string) {
        await this.userModule.findByIdAndUpdate(
            userId,
            { tasks: [taskId] }
        )
    }

    async getUser(userId: string): Promise<User> {
        return await this.userModule.findOne({ _id: userId });
    }

}