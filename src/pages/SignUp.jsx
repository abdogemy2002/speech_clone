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
    setShowForm(true); // إخفاء الأزرار عند الضغط
  };

  const goBack = () => {
    setActiveForm("");
    setShowForm(false); // إعادة إظهار الأزرار
  };

  return (
    <div className={`signup-page ${showForm ? "show-form" : ""}`}>
      <div className="left-section col-md-6">
        <img
          src="src/assets/KHATWTNTK-logo.svg"
          alt="مرحباً"
          className="big-image"
        />
      </div>

      <div className="right-section col-md-6 ">
        {showForm && (
          <button className="back-button" onClick={goBack}>
            &#8592; رجوع
          </button>
        )}


        <div className={`button-container ${showForm ? "hidden" : ""}`}>
        {!showForm && <h2 className="dynamic-title">حساب جديد</h2>}
<div className="d-flex flex-row gap-4">
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

// Patient Sign-Up Form
const PatientSignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      phoneNumber: "",
      password: "",
      userType: 0, // Patient user type
      address: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      displayName: Yup.string().required("الاسم مطلوب"),
      phoneNumber: Yup.string()
        .matches(/^\d{10,15}$/, "رقم الهاتف غير صالح")
        .required("رقم الهاتف مطلوب"),
      password: Yup.string()
        .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "يجب أن تحتوي كلمة المرور على حرف واحد ورقم ورمز خاص على الأقل"
        )
        .required("كلمة المرور مطلوبة"),
      address: Yup.string().required("العنوان مطلوب"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/users", values)
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
        <label>الاسم</label>
        <input
          type="text"
          className="form-control"
          name="displayName"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل اسمك"
        />
        {formik.touched.displayName && formik.errors.displayName && (
          <div className="error">{formik.errors.displayName}</div>
        )}
      </div>
      <div className="mb-3">
        <label>رقم الهاتف</label>
        <input
          type="text"
          className="form-control"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل رقم هاتفك"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className="error">{formik.errors.phoneNumber}</div>
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
      <div className="mb-3">
        <label>العنوان</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل عنوانك"
        />
        {formik.touched.address && formik.errors.address && (
          <div className="error">{formik.errors.address}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-100">
        تسجيل
      </button>
    </form>
  );
};

// Doctor Sign-Up Form
const DoctorSignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      phoneNumber: "",
      password: "",
      userType: 1, // Doctor user type
      address: "",
      specialization: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      displayName: Yup.string().required("الاسم مطلوب"),
      phoneNumber: Yup.string()
        .matches(/^\d{10,15}$/, "رقم الهاتف غير صالح")
        .required("رقم الهاتف مطلوب"),
      password: Yup.string()
        .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "يجب أن تحتوي كلمة المرور على حرف واحد ورقم ورمز خاص على الأقل"
        )
        .required("كلمة المرور مطلوبة"),
      address: Yup.string().required("العنوان مطلوب"),
      specialization: Yup.string().required("التخصص مطلوب"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/users", values)
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
        <label>الاسم</label>
        <input
          type="text"
          className="form-control"
          name="displayName"
          value={formik.values.displayName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل اسمك"
        />
        {formik.touched.displayName && formik.errors.displayName && (
          <div className="error">{formik.errors.displayName}</div>
        )}
      </div>
      <div className="mb-3">
        <label>رقم الهاتف</label>
        <input
          type="text"
          className="form-control"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل رقم هاتفك"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className="error">{formik.errors.phoneNumber}</div>
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
      <div className="mb-3">
        <label>العنوان</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="أدخل عنوانك"
        />
        {formik.touched.address && formik.errors.address && (
          <div className="error">{formik.errors.address}</div>
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
      <button type="submit" className="btn btn-primary w-100">
        تسجيل
      </button>
    </form>
  );
};

export default SignUpPage;
