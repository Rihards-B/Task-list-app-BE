import { Response } from "express";

export namespace TranslationResponses {
    export const LanguageFound = (res: Response, translations: Object) => {
        res.status(200).json(translations);
    }

    export const LanguageNotFound = (res: Response, code: string) => {
        res.status(404).json({ "msg": "Language with code: " + code + " not found" });
    }
}