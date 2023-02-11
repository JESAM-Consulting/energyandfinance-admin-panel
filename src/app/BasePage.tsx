import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import { Dashboard } from "../_metronic/components/dashboard/Dashboard";
import Contact from "../_metronic/components/contact/Contact";
import Onform from "../_metronic/components/Onform/Onform";

export default function BasePage() {

  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <ContentRoute exact path="/dashboard" component={Dashboard} children={undefined} render={undefined} />
            <ContentRoute exact path="/contact" component={Contact} children={undefined} render={undefined} />
            <ContentRoute exact path="/onform" component={Onform} children={undefined} render={undefined} />
          <Redirect to="error/error-v6" />
        </Switch>
      </Suspense> 
    </>
  );
}
