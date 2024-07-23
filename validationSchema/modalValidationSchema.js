import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("*required"),
  category: Yup.string().required("*required"),
  compartment: Yup.string().required("*required"),
  quantity: Yup.number().min(1, "min. 1").max(99, "max. 99").positive("positive num.").round().required("*required"),
  boughtDate: Yup.number().required("*required"),
  expiryDate: Yup.number().required("*required"),
});
export const AuthSchema = Yup.object().shape({
  email: Yup.string().email("*Invalid email address").required("*Email is required"),
  password: Yup.string()
    .min(8, "*At least 8 characters")
    .matches(/[a-z]/, "*At least one lowercase letter")
    .matches(/[A-Z]/, "*At least one uppercase letter")
    .matches(/[0-9]/, "*At least one number")
    .matches(/[@$!%*?&]/, "*At least one special character")
    .required("*Password is required"),
});
