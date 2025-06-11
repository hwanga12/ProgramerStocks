import styled from "styled-components";
import React, { ForwardedRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: React.HTMLInputTypeAttribute;
}

const InputText = React.forwardRef(
  (
    { placeholder, inputType = "text", ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyle
        placeholder={placeholder}
        ref={ref}
        type={inputType}
        {...props}
      />
    );
  }
);

const InputTextStyle = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.background};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.secondary};
  }
`;

export default InputText;
