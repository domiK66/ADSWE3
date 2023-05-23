import React from 'react';
import * as Validator from '../services/utils/Validator';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonPage } from '@ionic/react';
import { BuildForm, FormDescription } from '../services/utils/FormBuilder';
import { RouteComponentProps } from 'react-router';
import { loggedIn, register } from '../services/actions/user';
import { useDispatch } from 'react-redux';
import { executeDelayed } from '../services/utils/AsyncHelpers';
import { LoginRequest, ResponseModel, User, UserClient } from '../services/rest/interface';
import ServerConfig from '../services/rest/server-config';
import { IConfig } from '../services/rest/iconfig';
import { AppStorage } from '../services/utils/AppStorage';

type formData = Readonly<User>;

const formDescription: FormDescription<formData> = {
  name: 'register',
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      position: 'floating',
      color: 'primary',
      validators: [Validator.required, Validator.email]
    },
    {
      name: 'firstname',
      label: 'Firstname',
      type: 'text',
      position: 'floating',
      color: 'primary',
      validators: [Validator.required, Validator.minLength(4)]
    },
    {
      name: 'lastname',
      label: 'Lastname',
      type: 'text',
      position: 'floating',
      color: 'primary',
      validators: [Validator.required, Validator.minLength(4)]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      position: 'floating',
      color: 'primary',
      validators: [Validator.required]
    }
  ],
  submitLabel: 'Register'
};

const { Form, loading, error } = BuildForm(formDescription);

export const Register: React.FunctionComponent<RouteComponentProps<any>> = props => {
  const dispatch = useDispatch();
  const accessHeader = new IConfig();
  const userClient = new UserClient(accessHeader, ServerConfig.host);

  const submit = (userData: User) => {
    dispatch(loading(true));
    userClient
      .register(userData)
      .then((userInfo: ResponseModel) => {
        console.log(userInfo);
        const response = register(userInfo);
        dispatch(response);
  
        if (userInfo) {
          executeDelayed(200, () => props.history.replace('/home'));
        } else {
          dispatch(error('Error'));
        }
      })
      .catch((err: Error) => {
        dispatch(error('Error while logging in1: ' + err.message));
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
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Form handleSubmit={submit} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
