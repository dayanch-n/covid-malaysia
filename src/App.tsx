import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { statsChart, pizza, home } from 'ionicons/icons';
import Home from './pages/Home';
import State from './pages/State';
import Statistics from './pages/Statistics';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/state">
            <State />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Malaysia</IonLabel>
          </IonTabButton>
          <IonTabButton tab="state" href="/state">
            <IonIcon icon={pizza} />
            <IonLabel>State</IonLabel>
          </IonTabButton>
          <IonTabButton tab="statistics" href="/statistics">
            <IonIcon icon={statsChart} />
            <IonLabel>Statistics</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonReactRouter>
    </IonApp>
);

export default App;
