import styled from "styled-components";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
}

const Button = ({
  children,
  scheme = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyle
      $scheme={scheme}
      $size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "로딩중..." : children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{
  $scheme: "primary" | "secondary";
  $size: "small" | "medium" | "large";
}>`
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;

  ${({ $size }) => {
    switch ($size) {
      case "small":
        return "padding: 0.4rem 0.75rem; font-size: 0.9rem;";
      case "large":
        return "padding: 1rem 1.5rem; font-size: 1.125rem;";
      default:
        return "padding: 0.75rem 1rem; font-size: 1rem;";
    }
  }}

  ${({ $scheme, theme }) =>
    $scheme === "primary"
      ? `
        background-color: ${theme.color.primary};
        color: #fff;

        &:hover {
          background-color: ${theme.color.secondary};
        }
      `
      : `
        background-color: ${theme.color.border};
        color: ${theme.color.text};

        &:hover {
          background-color: ${theme.color.secondary};
          color: #fff;
        }
      `}
`;

export default Button;
