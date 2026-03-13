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
        <div className="auth-header">
          <h2>خوش آمدید</h2>
          <p>لطفاً اطلاعات خود را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
