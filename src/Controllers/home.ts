import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export default async (req: Request, res: Response): Promise<void> => {
    res.render("home", {
        title: "Home directory",
        message: "Hello world!"
    });
};