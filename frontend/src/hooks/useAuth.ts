import { login, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const { storeLogin, storeLogout } = useAuthStore();

  const userLogin = async (data: LoginProps) => {
    try {
      const res = await login(data);
      storeLogin(res.token);
      showAlert("로그인 완료되었습니다.");
      navigate("/");
    } catch (error) {
      showAlert("로그인이 실패했습니다.");
    }
  };

  const userLogout = async () => {
    try {
      storeLogout();
      showAlert("로그아웃이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      showAlert("로그아웃에 실패하였습니다.");
    }
  };

  const userSignup = async (data: SignupProps) => {
    try {
      await signup(data);
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      showAlert("회원가입에 실패했습니다.");
    }
  };

  return {
    userLogin,
    userLogout,
    userSignup,
  };
};
