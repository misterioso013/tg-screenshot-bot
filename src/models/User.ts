import { PrismaClient } from "@prisma/client";

export interface IUser {
    id: string
  name: string
  width: number
  height: number
  mobile: boolean
  delay: number
  language: string
  createdAt: Date
}

interface IUserCreate {
    id: string
    name: string
    width: number
    height: number
    mobile: boolean
    delay: number
    language: string
}

interface IUserUpdate {
    name?: string
    width?: number
    height?: number
    mobile?: boolean
    delay?: number
    language?: string
}

export class User {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async create(user: IUserCreate): Promise<IUser> {
        const result = await this.prisma.user.create({
            data: user
        })

        return result
    }

    async update(id: string, user: IUserUpdate): Promise<IUser> {
        const result = await this.prisma.user.update({
            where: {
                id: id
            },
            data: user
        })

        return result
    }

    async get(id: string): Promise<IUser | null> {
        const result = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return result
    }

    async delete(id: string): Promise<IUser> {
        const result = await this.prisma.user.delete({
            where: {
                id: id
            }
        })

        return result
    }
}