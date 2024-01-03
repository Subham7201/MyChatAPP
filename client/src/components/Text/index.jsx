import React from "react";

const sizeClasses = {
  txtPoppinsBold48: "font-bold font-poppins",
  txtPoppinsSemiBold500: "font-poppins font-semibold",
  txtMontserratRegular1631Black900: "font-montserrat font-normal",
  txtPoppinsBold2739: "font-bold font-poppins",
  txtMontserratRegular1631: "font-montserrat font-normal",
  txtMontserratRomanMedium1631: "font-medium font-montserrat",
  txtPoppinsRegular14: "font-normal font-poppins",
  txtMontserratRegular1631Gray900: "font-montserrat font-normal",
  txtMontserratRegular1835: "font-montserrat font-normal",
  txtPoppinsBold36: "font-bold font-poppins",
  txtPoppinsMedium16: "font-medium font-poppins",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
