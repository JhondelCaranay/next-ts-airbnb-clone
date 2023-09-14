"use client";

import { cn } from "@/utils/utils";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type InputProps<T extends FieldValues> = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  displayMessage?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

const Input = <T extends FieldValues>({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  displayMessage,
  errors,
}: InputProps<T>) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id as Path<T>, { required })}
        placeholder=" "
        type={type}
        className={cn(
          "peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
          formatPrice ? "pl-9" : "pl-4",
          errors[id] ? "border-rose-500" : "border-neutral-300",
          errors[id] ? "focus:border-rose-500" : "focus:border-black"
        )}
      />
      <label
        className={cn(
          "absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]  peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-4",
          formatPrice ? "left-9" : "left-4",
          errors[id] ? "text-rose-500" : "text-zinc-400"
        )}
      >
        {label}
      </label>
      {displayMessage && (
        <p className="text-rose-500 text-xs pl-2">{errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default Input;
