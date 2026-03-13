import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const schema = yup
  .object({
    name: yup.string().required("وارد کردن نام الزامی است"),
    email: yup
      .string()
      .email("ایمیل وارد شده معتبر نیست")
      .required("ایمیل الزامی است"),
    password: yup
      .string()
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
      .required("رمز عبور الزامی است"),
  })
  .required();

const Register = () => {
  const { register: loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginUser(data);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* بخش عنوان طبق عکس شما */}
        <div className="auth-header">
          <h2>خوش آمدید</h2>
          <p>لطفاً اطلاعات خود را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* فیلد نام */}
          <div className="form-group">
            <label>نام و نام خانوادگی</label>
            <input
              {...register("name")}
              placeholder="مثلاً: احمد سیاحی"
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && (
              <span className="error-msg">{errors.name.message}</span>
            )}
          </div>

          {/* فیلد ایمیل */}
          <div className="form-group">
            <label>ایمیل</label>
            <input
              {...register("email")}
              placeholder="example@mail.com"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && (
              <span className="error-msg">{errors.email.message}</span>
            )}
          </div>

          {/* فیلد رمز عبور */}
          <div className="form-group">
            <label>رمز عبور</label>
            <input
              type="password"
              {...register("password")}
              placeholder="******"
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && (
              <span className="error-msg">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="submit-btn">
            ورود به سیستم
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./Register.scss"; // حتماً ایمپورت کن

// const schema = yup
//   .object({
//     name: yup.string().required("نام الزامی است"),
//     email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
//     password: yup
//       .string()
//       .min(6, "حداقل ۶ کاراکتر")
//       .required("رمز عبور الزامی است"),
//   })
//   .required();

// const Register = () => {
//   const { register: loginUser } = useAuth();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data) => {
//     loginUser(data);
//     navigate("/");
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h2>خوش آمدید</h2>
//         <p style={{ marginBottom: "20px", color: "#888" }}>
//           لطفاً اطلاعات خود را وارد کنید
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="form-group">
//             <label>نام و نام خانوادگی</label>
//             <input {...register("name")} placeholder="مثلاً: احمد سیاحی" />
//             <p className="error-msg">{errors.name?.message}</p>
//           </div>

//           <div className="form-group">
//             <label>ایمیل</label>
//             <input {...register("email")} placeholder="example@mail.com" />
//             <p className="error-msg">{errors.email?.message}</p>
//           </div>

//           <div className="form-group">
//             <label>رمز عبور</label>
//             <input
//               type="password"
//               {...register("password")}
//               placeholder="******"
//             />
//             <p className="error-msg">{errors.password?.message}</p>
//           </div>

//           <button type="submit">ورود به سیستم</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const schema = yup
//   .object({
//     name: yup.string().required("نام الزامی است"),
//     email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
//     password: yup.string().min(6, "حداقل ۶ کاراکتر").required(),
//   })
//   .required();

// const Register = () => {
//   const { register: loginUser } = useAuth();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data) => {
//     loginUser(data); // ذخیره در کانتکست و لوکال استوریج
//     navigate("/"); // هدایت به داشبورد
//   };

//   return (
//     <div className="auth-container">
//       <h2>ثبت‌نام در سیستم مالی</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input {...register("name")} placeholder="نام و نام خانوادگی" />
//         <p>{errors.name?.message}</p>

//         <input {...register("email")} placeholder="ایمیل" />
//         <p>{errors.email?.message}</p>

//         <input
//           type="password"
//           {...register("password")}
//           placeholder="رمز عبور"
//         />
//         <p>{errors.password?.message}</p>

//         <button type="submit">عضویت و ورود</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
