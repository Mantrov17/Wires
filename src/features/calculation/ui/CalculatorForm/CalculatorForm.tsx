import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCities } from "../../model/useCities";
import { CalculationFormValues } from "../../types/calculation";

interface CalculatorFormProps {
  onSubmit: (values: CalculationFormValues) => void;
  isLoading: boolean;
}

const validationSchema = Yup.object().shape({
  city: Yup.string().required("Обязательное поле"),
  span_length: Yup.number()
    .min(1, "Минимум 1 метр")
    .required("Обязательное поле"),
  F0: Yup.number().positive().required("Обязательное поле"),
  d: Yup.number().positive().required("Обязательное поле"),
  p: Yup.number().positive().required("Обязательное поле"),
  a0: Yup.number().positive().required("Обязательное поле"),
  E0: Yup.number().positive().required("Обязательное поле"),
  o_r: Yup.number().positive().required("Обязательное поле"),
  o_h: Yup.number().positive().required("Обязательное поле"),
  o_c: Yup.number().positive().required("Обязательное поле"),
});

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const { data: cities, isLoading: citiesLoading, error } = useCities();

  if (citiesLoading) return <div>Загрузка городов...</div>;
  if (error instanceof Error)
    return <div>Ошибка загрузки: {error.message}</div>;

  return (
    <div className="calculator-form">
      <Formik
        initialValues={{
          city: "", // изменено
          span_length: 100,
          F0: 50,
          d: 10,
          p: 0.5,
          a0: 0.000023,
          E0: 8000,
          o_r: 12,
          o_h: 10,
          o_c: 8,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="city">Город</label>
              <Field as="select" name="city" className="form-control">
                <option value="">Выберите город</option>
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.city}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="city"
                component="div"
                className="error-message"
              />
            </div>

            {[
              "span_length",
              "F0",
              "d",
              "p",
              "a0",
              "E0",
              "o_r",
              "o_h",
              "o_c",
            ].map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{getFieldLabel(field)}</label>
                <Field
                  name={field}
                  type="number"
                  step={field === "span_length" ? 1 : 0.01}
                  className="form-control"
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="error-message"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="submit-button"
            >
              {isLoading ? "Расчет..." : "Рассчитать"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    span_length: "Длина пролета (м)",
    F0: "Сечение провода (мм²)",
    d: "Диаметр провода (мм)",
    p: "Вес провода (кг/м)",
    a0: "Коэффициент расширения (1/°C)",
    E0: "Модуль упругости (кг/мм²)",
    o_r: "Допустимое напряжение (нагрузка)",
    o_h: "Допустимое напряжение (температура)",
    o_c: "Допустимое напряжение (среднее)",
  };
  return labels[field] || field;
};
