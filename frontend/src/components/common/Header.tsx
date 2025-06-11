import { styled } from "styled-components";
import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/images/logo.png";

const Header = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const { userLogout } = useAuth();
  return (
    <HeaderStyle>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">
              <img src={logo} alt="logo" width="100px" />
            </Link>
          </li>
          {/* <li>
            <Link to="/">홈</Link>
          </li> */}
          <li>
            <Link to="/assets">보유 자산</Link>
          </li>
          <li>
            <Link to="/transactions">거래 내역</Link>
          </li>
        </ul>
      </nav>
      <nav className="auth">
        {isLoggedIn ? (
          <ul>
            <li>
              <button onClick={() => userLogout()}>로그아웃</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                로그인
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaRegUser />
                회원가입
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  .navigation {
    ul {
      display: flex;
      align-items: center;
      gap: 50px;
      li {
        a,
        button {
          color: black;
          font-size: 25px;
          font-weight: 600;
          text-decoration: none;
        }
      }
    }
  }
  .auth {
    display: flex;

    ul {
      justify-self: end;
      display: flex;
      gap: 20px;
      li {
        a,
        button {
          color: black;
          font-size: 18px;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;
          background: none;
          border: none;
          cursor: pointer;
          gap: 5px;
        }
      }
    }
  }
`;

export default Header;
