import React from "react";
import * as Validator from "../../services/utils/Validator";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonPage,
} from "@ionic/react";
import { BuildForm, FormDescription } from "../../services/utils/FormBuilder";
import { RouteComponentProps } from "react-router";
import { loggedIn } from "../../services/actions/Users";
import { useDispatch } from "react-redux";
import { executeDelayed } from "../../services/utils/AsyncHelpers";
import { LoginRequest, UserClient } from "../../services/rest/interface";
import ServerConfig from "../../services/rest/ServerConfig";
import { IConfig } from "../../services/rest/IConfig";
import { AppStorage } from "../../services/utils/AppStorage";

type formData = Readonly<LoginRequest>;

const formDescription: FormDescription<formData> = {
  name: "login",
  fields: [
    {
      name: "username",
      label: "Email",
      type: "email",
      position: "floating",
      color: "primary",
      validators: [Validator.required, Validator.email],
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      position: "floating",
      color: "primary",
      validators: [Validator.required],
    },
  ],
  submitLabel: "Login",
};

const { Form, loading, error } = BuildForm(formDescription);

export const Login: React.FunctionComponent<RouteComponentProps<any>> = (
  props
) => {
  const dispatch = useDispatch();

  const accessHeader = new IConfig();
  const userClient = new UserClient(accessHeader, ServerConfig.host);

  const submit = (loginData: LoginRequest) => {
    dispatch(loading(true));
    userClient
      .login(loginData)
      .then((loginInfo: any) => {
        const authresponse = loggedIn(loginInfo);
        dispatch(authresponse);
        if (loginInfo.hasError === false) {
          const JWTStore = new AppStorage();
          Promise.all([
            JWTStore.set(
              "user",
              JSON.stringify(
                loginInfo.data.user &&
                  typeof (loginInfo.data?.user === "object"
                    ? loginInfo.data?.user
                    : {})
              )
            ),
            JWTStore.set(
              "authenticationInformation",
              JSON.stringify(
                loginInfo.data.user &&
                  typeof (loginInfo.data?.user === "object"
                    ? loginInfo.data?.authenticationInformation
                    : {})
              )
            ),
          ]).then(() => {
            executeDelayed(200, () => props.history.replace("/values"));
          });
        } else {
          dispatch(error("Error while logging in: " + loginInfo.message));
        }
      })
      .catch((err: Error) => {
        dispatch(error("Error while logging in: " + err.message));
      })
      .finally(() => dispatch(loading(false)));
  };

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Form handleSubmit={submit} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
