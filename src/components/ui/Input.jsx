import React, { forwardRef } from "react";

const Input = forwardRef(({ 
  label, 
  icon: Icon, 
  error, 
  className = "", 
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 
            ${Icon ? "pl-11" : ""}
            bg-white/80 backdrop-blur-sm
            border border-gray-200 
            rounded-xl
            text-gray-800 placeholder-gray-400
            transition-all duration-300
            focus:outline-none focus:border-aqua-400 focus:ring-2 focus:ring-aqua-400/20
            input-glow
            ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
