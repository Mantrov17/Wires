import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCities } from "../../model/useCities";
import { useWires } from "../../model/useWires";
import {
  AutoCalculationFormValues,
  CalculationResult,
  ManualCalculationFormValues,
} from "../../types/calculation";
import { useCalculation } from "../../model/useCalculation";
import styles from "./CalculatorForm.scss";
import { RussiaMap } from "../../../../shared/ui/RussiaMap/RussiaMap";
import { Modal } from "../../../../shared/ui/Modal/Modal";

interface CalculatorFormProps {
  onSuccess?: (result: CalculationResult) => void;
  isLoading?: boolean;
  errors?: Record<string, string>;
}

const autoValidationSchema = Yup.object().shape({
  city: Yup.string().required("Обязательное поле"),
  wire: Yup.string().required("Обязательное поле"),
  l: Yup.number()
    .min(1, "Минимум 1 метр")
    .max(500, "Максимум 500 метров")
    .required("Обязательное поле"),
});

const manualValidationSchema = Yup.object().shape({
  l: Yup.number().min(1, "Минимум 1 метр").required("Обязательное поле"),
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
  onSuccess,
  errors,
}) => {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const { calculateAuto, calculateManual, isLoadingAuto, isLoadingManual } =
    useCalculation();
  const [cityId, setCityId] = useState<string>("");
  const [isMapOpen, setIsMapOpen] = useState(false);

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

  const handleAutoSubmit = async (
    values: AutoCalculationFormValues,
    {
      resetForm,
      setFieldError,
    }: {
      resetForm: () => void;
      setFieldError: (field: string, message: string) => void;
    },
  ) => {
    try {
      const result = await calculateAuto(values);
      onSuccess?.(result);
      resetForm();
    } catch (error: any) {
      if (error.response?.data) {
        Object.entries(error.response.data).forEach(([field, messages]) => {
          setFieldError(field, (messages as string[]).join(", "));
        });
      }
    }
  };

  const handleManualSubmit = async (
    values: ManualCalculationFormValues,
    {
      resetForm,
      setFieldError,
    }: {
      resetForm: () => void;
      setFieldError: (field: string, message: string) => void;
    },
  ) => {
    try {
      const result = await calculateManual(values);
      onSuccess?.(result);
      resetForm();
    } catch (error: any) {
      if (error.response?.data) {
        Object.entries(error.response.data).forEach(([field, messages]) => {
          setFieldError(field, (messages as string[]).join(", "));
        });
      }
    }
  };

  if (citiesLoading || wiresLoading) return <div>Загрузка данных...</div>;
  if (citiesError || wiresError) return <div>Ошибка загрузки данных</div>;

  const handleCitySelect = (id: string) => {
    setCityId(id);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => setMode("auto")}
          className={
            mode === "auto"
              ? `${styles.modeSwitcherButton} ${styles.active}`
              : styles.modeSwitcherButton
          }
        >
          Автоматический
        </button>
        <button
          type="button"
          onClick={() => setMode("manual")}
          className={
            mode === "manual"
              ? `${styles.modeSwitcherButton} ${styles.active}`
              : styles.modeSwitcherButton
          }
        >
          Ручной
        </button>
      </div>

      {mode === "auto" ? (
        <Formik
          initialValues={{
            city: "",
            wire: "",
            l: 300,
          }}
          validationSchema={autoValidationSchema}
          onSubmit={handleAutoSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className={styles.formGroup}>
                <div
                  className={styles.selectTrigger}
                  onClick={() => setIsMapOpen(true)}
                >
                  {values.city
                    ? cities?.find((c) => String(c.id) === values.city)?.city ||
                      "Город не найден"
                    : "Выберите город на карте"}
                </div>
                <Field type="hidden" name="city" />
                <ErrorMessage
                  name="city"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="wire">Марка провода</label>
                <Field
                  as="select"
                  name="wire"
                  className={styles.formGroupSelect}
                >
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
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="l">Длина пролета (м)</label>
                <Field
                  name="l"
                  type="number"
                  step="0.1"
                  className={styles.formGroupNumberInput} // Изменено здесь
                />
                <ErrorMessage
                  name="l"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <button
                type="submit"
                disabled={isLoadingAuto || isSubmitting}
                className={styles.submitButton}
              >
                {isLoadingAuto ? "Расчет..." : "Рассчитать"}
              </button>
              <Modal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)}>
                <h3>Выберите город на карте</h3>
                <RussiaMap
                  onSelectCity={(cityId) => {
                    setFieldValue("city", cityId);
                    setIsMapOpen(false);
                  }}
                />
              </Modal>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            l: 300.5,
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
          onSubmit={handleManualSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.manualFormGrid}>
              {Object.entries({
                l: "Длина пролета (м)",
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
                <div key={field} className={styles.formGroup}>
                  <label className={styles.formGroupLabel} htmlFor={field}>
                    {label}
                  </label>
                  <Field
                    name={field}
                    type="number"
                    step={field === "l" ? 0.1 : 1}
                    className={styles.formGroupNumberInput} // Изменено здесь
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoadingManual || isSubmitting}
                className={styles.submitButton}
              >
                {isLoadingManual ? "Расчет..." : "Рассчитать"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
