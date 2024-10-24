import { Request, Response } from "express";
import { BaseEndpoint } from "./BaseController";
import { TranslationResponses } from "../responses/TranslationResponses";
import en from "../assets/translations/en.json";
import lv from "../assets/translations/lv.json";
import fs from "fs";
import { matchedData } from "express-validator";

export const getTranslations = BaseEndpoint(async (req: Request, res: Response) => {
    const languages = ["en", "lv"];
    const data = matchedData(req);
    if (languages.includes(data.code)) {
        let translationsFile = fs.readFileSync(__dirname + "/../assets/translations/" + data.code + ".json");
        TranslationResponses.LanguageFound(res, JSON.parse(translationsFile.toString()));
    } else {
        TranslationResponses.LanguageNotFound(res, data.code);
    }
})