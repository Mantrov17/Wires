import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCities } from "../../model/useCities";
import { useWires } from "../../model/useWires";
import {
  AutoCalculationFormValues,
  ManualCalculationFormValues,
} from "../../types/calculation";

interface CalculatorFormProps {
  onSubmitAuto: (values: AutoCalculationFormValues) => void;
  onSubmitManual: (values: ManualCalculationFormValues) => void;
  isLoading: boolean;
  errors?: Record<string, string>;
}

const autoValidationSchema = Yup.object().shape({
  city: Yup.string().required("Обязательное поле"),
  wire: Yup.string().required("Обязательное поле"),
  span_length: Yup.number()
    .min(1, "Минимум 1 метр")
    .required("Обязательное поле"),
});

const manualValidationSchema = Yup.object().shape({
  span_length: Yup.number()
    .min(1, "Минимум 1 метр")
    .required("Обязательное поле"),
  t_min: Yup.number().required("Обязательное поле"),
  t_max: Yup.number().required("Обязательное поле"),
  t_avg: Yup.number().required("Обязательное поле"),
  e: Yup.number().min(1).max(6).required("Обязательное поле"),
  q: Yup.number().min(1).max(6).required("Обязательное поле"),
  F0: Yup.number().positive().required("Обязательное поле"),
  diameter: Yup.number().positive().required("Обязательное поле"),
  weight: Yup.number().positive().required("Обязательное поле"),
  a0: Yup.number().positive().required("Обязательное поле"),
  E0: Yup.number().positive().required("Обязательное поле"),
  o_r: Yup.number().positive().required("Обязательное поле"),
  o_c: Yup.number().positive().required("Обязательное поле"),
});

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onSubmitAuto,
  onSubmitManual,
  isLoading,
  errors,
}) => {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useCities();
  const {
    data: wires,
    isLoading: wiresLoading,
    error: wiresError,
  } = useWires();

  if (citiesLoading || wiresLoading) return <div>Загрузка данных...</div>;
  if (citiesError || wiresError) return <div>Ошибка загрузки данных</div>;

  return (
    <div className="calculator-form">
      <div className="mode-switcher">
        <button
          type="button"
          className={mode === "auto" ? "active" : ""}
          onClick={() => setMode("auto")}
        >
          Автоматический
        </button>
        <button
          type="button"
          className={mode === "manual" ? "active" : ""}
          onClick={() => setMode("manual")}
        >
          Ручной
        </button>
      </div>

      {mode === "auto" ? (
        <Formik
          initialValues={{
            city: "",
            wire: "",
            span_length: 300,
          }}
          validationSchema={autoValidationSchema}
          onSubmit={onSubmitAuto}
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

              <div className="form-group">
                <label htmlFor="wire">Провод</label>
                <Field as="select" name="wire" className="form-control">
                  <option value="">Выберите провод</option>
                  {wires?.map((wire) => (
                    <option key={wire.id} value={wire.id}>
                      {wire.wire}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="wire"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="span_length">Длина пролета (м)</label>
                <Field
                  name="span_length"
                  type="number"
                  step="0.1"
                  className="form-control"
                />
                <ErrorMessage
                  name="span_length"
                  component="div"
                  className="error-message"
                />
                {errors?.span_length && (
                  <div className="error-message">{errors.span_length}</div>
                )}
              </div>

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
      ) : (
        <Formik
          initialValues={{
            span_length: 300.5,
            t_min: -40,
            t_max: 40,
            t_avg: 5,
            e: 1,
            q: 1,
            F0: 137,
            diameter: 15.2,
            weight: 492,
            a0: 18.9,
            E0: 8450,
            o_r: 12.2,
            o_c: 7.25,
          }}
          validationSchema={manualValidationSchema}
          onSubmit={onSubmitManual}
        >
          {({ isSubmitting }) => (
            <Form>
              {Object.entries({
                span_length: "Длина пролета (м)",
                t_min: "Минимальная температура (℃)",
                t_max: "Максимальная температура (℃)",
                t_avg: "Среднегодовая температура (℃)",
                e: "Район по гололеду (1-6)",
                q: "Район по ветру (1-6)",
                F0: "Сечение провода (мм²)",
                diameter: "Диаметр провода (мм)",
                weight: "Вес провода (кг/км)",
                a0: "Коэффициент расширения (1/град)",
                E0: "Модуль упругости (кг/мм²)",
                o_r: "Допустимое напряжение (нагрузка, кг/мм²)",
                o_c: "Допустимое напряжение (среднее, кг/мм²)",
              }).map(([field, label]) => (
                <div key={field} className="form-group">
                  <label htmlFor={field}>{label}</label>
                  <Field
                    name={field}
                    type="number"
                    step={field === "span_length" ? 0.1 : 1}
                    className="form-control"
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="error-message"
                  />
                  {errors?.[field] && (
                    <div className="error-message">{errors[field]}</div>
                  )}
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
      )}
    </div>
  );
};

const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    span_length: "Длина пролета (м)",
    F0: "Сечение провода (мм²)",
    diameter: "Диаметр провода (мм)",
    weight: "Вес провода (кг/км)",
    a0: "Коэффициент расширения (1/град)",
    E0: "Модуль упругости (кг/мм²)",
    o_r: "Допустимое напряжение (нагрузка)",
    o_c: "Допустимое напряжение (среднее)",
  };
  return labels[field] || field;
};
