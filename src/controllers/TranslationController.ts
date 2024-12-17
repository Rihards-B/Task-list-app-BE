import { Request, Response } from "express";
import { BaseEndpoint } from "./BaseController";
import { TranslationResponses } from "../responses/TranslationResponses";
import fs from "fs";
import { matchedData } from "express-validator";

export const getTranslations = BaseEndpoint(async (req: Request, res: Response) => {
    const languages = ["en", "lv"];
    const data = matchedData(req);
    if (languages.includes(data.code)) {
        // data.code is validated by middleware to be a locale
        let filePath = __dirname + "/../assets/translations/" + data.code + ".json"
        if (fs.existsSync(filePath)) {
            let translationsFile = fs.readFileSync(filePath);
            TranslationResponses.LanguageFound(res, JSON.parse(translationsFile.toString()));
        }
    }
    TranslationResponses.LanguageNotFound(res, data.code);
})