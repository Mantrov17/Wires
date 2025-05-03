import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useSubjects } from "../../model/useSubjects";
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
import {
  autoValidationSchema,
  manualValidationSchema,
} from "../../model/validationSchema";

interface CalculatorFormProps {
  onSuccess?: (result: CalculationResult) => void;
  isLoading?: boolean;
  errors?: Record<string, string>;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onSuccess,
  errors,
}) => {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const { calculateAuto, calculateManual, isLoadingAuto, isLoadingManual } =
    useCalculation();
  const [subjectId, setSubjectId] = useState<string>("");
  const [isMapOpen, setIsMapOpen] = useState(false);

  const {
    data: subjects,
    isLoading: subjectsLoading,
    error: subjectsError,
  } = useSubjects();
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
    helpers: FormikHelpers<ManualCalculationFormValues>,
  ) => {
    try {
      const result = await calculateManual(values);
      onSuccess?.(result);
      helpers.resetForm();
    } catch (error: any) {
      if (error.response?.data) {
        Object.entries(error.response.data).forEach(([field, messages]) => {
          helpers.setFieldError(field, (messages as string[]).join(", "));
        });
      }
    } finally {
      helpers.setSubmitting(false);
    }
  };

  if (subjectsLoading || wiresLoading) return <div>Загрузка данных...</div>;
  if (subjectsError || wiresError) return <div>Ошибка загрузки данных</div>;

  return (
    <div>
      <div>
        <p>Режим расчёта:</p>
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
          key="auto"
          initialValues={{
            subject: "",
            wire: "",
            l: 300,
          }}
          validationSchema={autoValidationSchema}
          onSubmit={handleAutoSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Field
                as="select"
                name="subject"
                className={styles.formGroupSelect}
              >
                <option value="">Выберите регион</option>
                {subjects?.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subject}
                  </option>
                ))}
              </Field>

              <ErrorMessage
                name="subject"
                component="div"
                className={styles.errorMessage}
              />

              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                className={styles.mapButton}
              >
                Выбрать регион на карте
              </button>

              <div className={styles.formGroup}>
                <label htmlFor="wire">Марка провода:</label>
                <Field
                  as="select"
                  name="wire"
                  className={styles.formGroupSelect}
                >
                  <option value="">Выберите марку провода</option>
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
                <label htmlFor="l">Длина пролёта (м):</label>
                <Field
                  as="input"
                  name="l"
                  type="number"
                  step="0.1"
                  className={styles.formGroupNumberInput}
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
                {isLoadingAuto ? "Расчёт..." : "Рассчитать"}
              </button>
              <Modal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)}>
                <h3 className={styles.regionChangeTitle}>
                  Выберите регион на карте
                </h3>
                <RussiaMap
                  onSelectSubject={(SubjectId) => {
                    setFieldValue("subject", SubjectId);
                    setIsMapOpen(false);
                  }}
                />
              </Modal>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          key="manual"
          initialValues={{
            l: 230,
            t_min: -40,
            t_max: 40,
            t_avg: 5,
            e: 2,
            q: 3,
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
                l: "Длина пролёта (м)",
                t_min: "Минимальная температура (℃)",
                t_max: "Максимальная температура (℃)",
                t_avg: "Среднегодовая температура (℃)",
                e: "Район по гололёду (1-6)",
                q: "Район по ветровому давлению (1-6)",
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
                    as="input"
                    name={field}
                    type="number"
                    step={field === "l" ? 0.1 : 1}
                    className={styles.formGroupNumberInput}
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
                {isLoadingManual ? "Расчёт..." : "Рассчитать"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
