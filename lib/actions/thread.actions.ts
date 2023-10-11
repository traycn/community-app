"use server"

import { ThreadValidation } from "../validations/thread";
import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThread({text, author, communityId, path}: Params) {
    
    try {
            
        connectToDB();

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        // Update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })

        revalidatePath(path);
        
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`);
    }
    
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    connectToDB();

    // Calculate the nuber of threads (posts) to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch the threads (posts) that have no parents (top-level threads...)
    const threadsQuery = Thread.find({ parentId: {$in: [null, undefined]} })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({ 
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            } 
        })

        const totalThreadsCount = await Thread.countDocuments({ parentId: {$in: [null, undefined]} })

        const threads = await threadsQuery.exec();

        const isNext = totalThreadsCount > skipAmount + threads.length;

        return { threads, isNext }
}

export async function fetchThreadById(id: string) {
    connectToDB();

    try {

        // TODO: Populate Community
        const thread = await Thread.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path:'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            }).exec();

            return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.message}`);
    }
}