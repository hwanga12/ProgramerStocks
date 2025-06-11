import { useForm } from "react-hook-form";
import styled from "styled-components";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";

export interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const { userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    userLogin(data);
  };

  return (
    <>
      <LoginStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <Button type="submit" size="medium" scheme="primary">
            로그인
          </Button>
        </form>
      </LoginStyle>
    </>
  );
};

export const LoginStyle = styled.div`
  max-width: 400px;
  margin: 80px auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  fieldset {
    border: none;
    padding: 0;

    .error-text {
      color: ${({ theme }) => theme.color.rise};
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
  }

  button {
    margin-top: 1rem;
  }
`;

export default Login;
