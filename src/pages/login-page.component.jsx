import React, { useEffect, useState } from "react";
import SignIn from "../components/authentication/sign-in.component";
import { useTranslation } from "react-i18next";


const LoginPage = () => {
  const { t } = useTranslation();
  const [title] = useState(t("login.title"));

  useEffect(() => {
    // This will run when the page first loads and whenever the title changes
    document.title = title;
  }, [title]);
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default LoginPage;
