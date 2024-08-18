"use client";
import { useState } from "react";
import { Hide, Show } from "react-iconly";
import { cn } from "@/lib/utils";

interface props extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  parentClassName?: string;
}

const Input = ({
  label,
  placeholder,
  iconEnd,
  iconStart,
  parentClassName,
  ...props
}: props) => {
  const [showPassword, setShowPassword] = useState(false);

  const disabledClass = props.disabled
    ? "bg-slate-300 focus-within:outline-0"
    : "";

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 text-slate-500">{label}</label>}
      <div
        className={cn(
          "flex items-center justify-center gap-2 bg-slate-100 p-4 " +
            "rounded-md w-full text-slate-600 focus-within:ring-slate-300 " +
            "focus-within:ring-2 transition-all",
          disabledClass,
          parentClassName,
        )}
      >
        <div className="text-slate-400">{iconStart}</div>
        <input
          placeholder={placeholder}
          className="bg-transparent w-full focus:outline-none placeholder:text-slate-400"
          {...props}
          type={props.type === "password" && showPassword ? "text" : props.type}
        />
        <div className="text-slate-400">{iconEnd}</div>
        {props.type === "password" && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400"
          >
            {showPassword ? <Hide /> : <Show />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
