import { Router } from "express";
import { getTranslations } from "../controllers/TranslationController";
import { param } from "express-validator";

export const translationRoutes = Router();

translationRoutes.get("/:code", param("code").isLocale().withMessage("Not a valid language format"), getTranslations)