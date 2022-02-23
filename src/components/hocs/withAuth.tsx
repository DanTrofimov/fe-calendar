import React, { ComponentType } from "react";
import AuthWrapper from "../pages/AuthWrapper";

export default function withAuthWrapper(Component: ComponentType, props: any) {
  return (
    <AuthWrapper>
      <Component {...props}/>
    </AuthWrapper>
  );
}
