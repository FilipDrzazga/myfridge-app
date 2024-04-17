import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("*required"),
  category: Yup.string().required("*required"),
  compartment: Yup.string().required("*required"),
  quantity: Yup.number().min(1, "min. 1").max(99, "max. 99").positive("positive num.").round().required("*required"),
  boughtDate: Yup.number().required("*required"),
  expiryDate: Yup.number().required("*required"),
});
