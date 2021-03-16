export declare class TodoTxtTask {
    id: string;
    priority: string;
    createdDate: string;
    completedDate: string;
    projects: string[];
    contexts: string[];
    metadatas: string[];
    isActive: boolean;
    text: string;
    constructor(text?: string);
    parseInput(input: string): void;
    private parseStatus;
    private parsePriority;
    private parseCompletedDate;
    private parseCreatedDate;
    private getDatesFromText;
    private parseProjects;
    private parseContexts;
}
