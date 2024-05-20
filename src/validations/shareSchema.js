import * as Yup from "yup";
import { REGEX_URL } from "@/constants";

const FORM_SAHRE = {
  LINK: "link",
  DESCRIPTION: "description",
};

const shareInitialValues = {
  [FORM_SAHRE.LINK]: "",
  [FORM_SAHRE.DESCRIPTION]: "",
};

const shareFormSchema = () =>
  Yup.object().shape({
    [FORM_SAHRE.LINK]: Yup.string()
      .required("Please input youtube link")
      .matches(REGEX_URL, "Youtube url invalid"),
  });

export { shareFormSchema, shareInitialValues, FORM_SAHRE };
