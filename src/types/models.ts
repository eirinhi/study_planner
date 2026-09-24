/**
 * A course/subject the user is studying, used to group tasks.
 */
export type Subject = {
    id: string;
    name: string;
};

/**
 * A single task/to-do item that the user adds to their list of tasks, and is associated with a subject.
 */
export type Task = {
    id: string;
    title: string;
    deadline: string;
    done: boolean;
    subjectId?: string;
};