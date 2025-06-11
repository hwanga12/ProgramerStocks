import { useForm } from "react-hook-form";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";
import { LoginStyle } from "@/pages/Login";

export interface SignupProps {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const { userSignup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    userSignup(data);
  };

  return (
    <>
      <LoginStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이름"
              inputType="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="error-text">이름을 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.email && (
              <p className="error-text">유효한 이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p className="error-text">6자 이상 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>
        </form>
      </LoginStyle>
    </>
  );
};

export default Signup;
