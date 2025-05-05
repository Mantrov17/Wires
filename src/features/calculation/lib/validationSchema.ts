import * as Yup from "yup";

export const autoValidationSchema = Yup.object().shape({
  subject: Yup.string().required("Обязательное поле"),
  wire: Yup.string().required("Обязательное поле"),
  l: Yup.number()
    .min(1, "Минимум 1 метр")
    .max(500, "Максимум 500 метров")
    .required("Обязательное поле"),
});

export const manualValidationSchema = Yup.object().shape({
  l: Yup.number().min(1, "Минимум 1 метр").required("Обязательное поле"),
  t_min: Yup.number().required("Обязательное поле"),
  t_max: Yup.number().required("Обязательное поле"),
  t_avg: Yup.number().required("Обязательное поле"),
  e: Yup.number()
    .min(1, "Минимум 1")
    .max(6, "Максимум 6")
    .required("Обязательное поле"),
  q: Yup.number()
    .min(1, "Минимум 1")
    .max(6, "Максимум 6")
    .required("Обязательное поле"),
  F0: Yup.number()
    .positive("Должно быть положительным числом")
    .required("Обязательное поле"),
  diameter: Yup.number()
    .positive("Должно быть положительным числом")
    .required("Обязательное поле"),
  weight: Yup.number()
    .positive("Должно быть положительным числом")
    .required("Обязательное поле"),
  a0: Yup.number()
    .positive("Должно быть положительным числом")
    .required("Обязательное поле"),
  E0: Yup.number()
    .positive("Должно быть положительным числом")
    .required("Обязательное поле"),
  o_r: Yup.number()
    .positive("Должно быть положительным числом")
    .required("Обязательное поле"),
  o_c: Yup.number()
    .positive("Должно быть положительным числом")
    .required("Обязательное поле"),
});
