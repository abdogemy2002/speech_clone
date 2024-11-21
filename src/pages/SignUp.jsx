import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/SignUp.css";

const SignUpPage = () => {
  const [activeForm, setActiveForm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = (formType) => {
    setActiveForm(formType);
    setShowForm(true);
  };

  const goBack = () => {
    setActiveForm("");
    setShowForm(false);
  };

  return (
    <div className={`signup-page ${showForm ? "show-form" : ""}`}>
      <div className="left-section col-md-6">
        <img
          src="src/assets/KHATWTNTK-trans.png"
          alt="مرحباً"
          className="big-image"
        />
      </div>

      <div className="right-section col-md-6 bg-light">
        {showForm && (
          <button className="back-button" onClick={goBack}>
            &#8592; رجوع
          </button>
        )}

        {!showForm && <h2 className="dynamic-title">حساب جديد</h2>}

        <div className={`button-container ${showForm ? "hidden" : ""}`}>
          <button
            className={`toggle-button patient ${
              activeForm === "patient" ? "active-strip" : ""
            }`}
            onClick={() => handleButtonClick("patient")}
          >
            <img src="src/assets/kids-icon.png" alt="رمزالطفل" />
            تسجيل طفل
          </button>
          <button
            className={`toggle-button doctor ${
              activeForm === "doctor" ? "active-strip" : ""
            }`}
            onClick={() => handleButtonClick("doctor")}
          >
            <img src="src/assets/doctor-icon.png" alt="رمز الطبيب" />
            تسجيل طبيب
          </button>
        </div>

        <div className={`form-container ${showForm ? "visible" : ""}`}>
          {activeForm === "patient" && <PatientSignUp />}
          {activeForm === "doctor" && <DoctorSignUp />}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};


// نموذج تسجيل الطفل
const PatientSignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الاسم مطلوب"),
      email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      password: Yup.string()
        .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
        .required("كلمة المرور مطلوبة"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/patients", values)
        .then(() => {
          toast.success("تم التسجيل بنجاح كطفل!");
        })
        .catch(() => {
          toast.error("حدث خطأ أثناء التسجيل!");
        });
    },
  });

  return (
    <form className="signup-form" onSubmit={formik.handleSubmit}>
      <h2>تسجيل الطفل</h2>
      <div className="mb-3">
        <label>الاسم</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل اسمك"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </div>
      <div className="mb-3">
        <label>البريد الإلكتروني</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل بريدك الإلكتروني"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-3">
        <label>كلمة المرور</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل كلمة المرور"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        تسجيل
      </button>
    </form>
  );
};

// نموذج تسجيل الطبيب
const DoctorSignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      specialization: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الاسم مطلوب"),
      email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      specialization: Yup.string().required("التخصص مطلوب"),
      password: Yup.string()
        .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
        .required("كلمة المرور مطلوبة"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/doctors", values)
        .then(() => {
          toast.success("تم التسجيل بنجاح كطبيب!");
        })
        .catch(() => {
          toast.error("حدث خطأ أثناء التسجيل!");
        });
    },
  });

  return (
    <form className="signup-form" onSubmit={formik.handleSubmit}>
      <h2>تسجيل الطبيب</h2>
      <div className="mb-3">
        <label>الاسم</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل اسمك"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </div>
      <div className="mb-3">
        <label>البريد الإلكتروني</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل بريدك الإلكتروني"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>
      <div className="mb-3">
        <label>التخصص</label>
        <input
          type="text"
          className="form-control"
          name="specialization"
          value={formik.values.specialization}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل تخصصك"
        />
        {formik.touched.specialization && formik.errors.specialization && (
          <div className="error">{formik.errors.specialization}</div>
        )}
      </div>
      <div className="mb-3">
        <label>كلمة المرور</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل كلمة المرور"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        تسجيل
      </button>
    </form>
  );
};

export default SignUpPage;
