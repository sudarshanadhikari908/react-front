import React, { useEffect, useState } from "react";
import ForgetPassword from "../components/authentication/forget-password.component";
import { useTranslation } from "react-i18next";


const ForgetPasswordPage = () => {
  const { t } = useTranslation();

  const [title] = useState("Forget Password ?");

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);
  return (
    <div>
     <ForgetPassword/>
    </div>
  );
};

export default ForgetPasswordPage;
