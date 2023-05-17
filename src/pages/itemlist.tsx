import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonButton,
  RefresherEventDetail,
  IonLabel
} from '@ionic/react';
import { train, add, trash, create, beer, boat, information, water, sunnySharp, flash, car, power, shieldCheckmark, alarm, bed, fish, flower } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { personCircle, search, star, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
//import '../../services/actions/security';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
//import {fetchValues} from "../../services/rest/values";
//import {IconConverter} from "../../services/utils/iconconverter";
import { CoralsResult, fetchCoralsAction } from '../services/actions/items';
import { RootState } from '../services/reducers/Index';

const ItemsList: React.FC<RouteComponentProps> = ({ history }) => {
  const { corals, isLoading, errorMessage } = useSelector((s: RootState) => s.items);
  const token = useSelector((s: RootState) => s.user.authenticationInformation!.token || '');
  const dispatch = useDispatch();
  const thunkDispatch = dispatch as ThunkDispatch<RootState, null, CoralsResult>;
  useEffect(() => {
    thunkDispatch(fetchCoralsAction()).then(x => console.log(x));
    console.log(corals);
  }, []);

  const NoValuesInfo = () =>
    !isLoading && corals.length == 0 ? (
      <IonCard>
        <img src="https://www.zooroyal.at/magazin/wp-content/uploads/2016/01/Aquarium-einrichten-ge%C3%A4ndert-760x560.jpg"></img>
        <IonCardHeader>
          <IonCardTitle>No Corals or Animals found...</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    ) : (
      <></>
    );

  const ListCorals = () => {
    const items = corals.map(coral => {
      let icon = flower;
      let unit = '';

      return (
        <IonItemSliding key={coral.id}>
          <IonItemOptions side="end">
            <IonItemOption
              onClick={() => {
                console.log(coral.name);
              }}>
              <IonIcon icon={information} /> Details
            </IonItemOption>
          </IonItemOptions>
          <IonItem key={coral.id} onClick={() => history.push('/coral/show/' + coral.id)}>
            <IonIcon icon={icon} />
            {coral.name} ({coral.amount})
            <div className="item-note" slot="end">
              {coral.species}
            </div>
          </IonItem>
        </IonItemSliding>
      );
    });
    return corals.length > 0 ? <IonList>{items}</IonList> : <NoValuesInfo />;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton onClick={() => history.push('/animal/add')}>
              <IonIcon slot="icon-only" icon={fish} />
            </IonButton>
            <IonButton onClick={() => history.push('/coral/add')}>
              <IonIcon slot="icon-only" icon={flower} />
            </IonButton>
          </IonButtons>
          <IonTitle>Corals and Animals List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Corals</IonLabel>
        </IonItem>

        {isLoading ? (
          <IonItem>
            <IonSpinner />
            Loading Values...
          </IonItem>
        ) : (
          <ListCorals />
        )}

        <IonItem>
          <IonLabel>Animals</IonLabel>
        </IonItem>

        <IonToast isOpen={errorMessage ? errorMessage.length > 0 : false} onDidDismiss={() => false} message={errorMessage} duration={5000} color="danger" />
      </IonContent>
    </IonPage>
  );
};

export default ItemsList;
