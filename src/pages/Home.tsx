/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, Fragment } from 'react';
import { IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import DataTable from 'react-data-table-component';
import axios from 'axios'

import './Home.css';
import { columns, regColumns } from '../helpers/table-columns';
import { processCSV } from '../helpers/processCSV'
import { setVaxMalaysia, getVaxMalaysia, setRegMalaysia, getRegMalaysia} from '../helpers/storage';
import filterByDate from '../pipes/filterByDate';
import VaxMalaysia from '../interfaces/vax_malaysia';
import Registration from '../interfaces/registration';

const Home: React.FC = () => {

  const [vaxLoading, setVaxLoading] = useState(true);
  const [regLoading, setRegLoading] = useState(true);

  const [vaxTableData, setVaxTableData] = useState<VaxMalaysia[]>([]); 
  const [regTableData, setRegTableData] = useState<Registration[]>([]);
  const [vaccineDates, setVaccineDates] = useState<string[]>([]);
  const [registrationDates, setRegistrationDates] = useState<string[]>([]);

  const [segment, setSegment]: any = useState(
    {
      vaccination: 'vaccination',
      registration: 'registration',
      active: 'vaccination'
    }
  )
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedRegDate, setSelectedRegDate] = useState<string>();
  const [filteredData,setFilteredData] = useState<any[]>([]);
  const [filteredRegData,setFilteredRegData] = useState<any[]>([]);

  const handleSegment = (event: any) => {
    setSegment((res: any) => ({...res, active: event.detail.value}))
  }

  useEffect(() => {
    if (!getVaxMalaysia()) {
      getMalaysiaVaxData()
    } else {
      const data = getVaxMalaysia();
      setVaxLoading(false);
      mapVaxMalaysiaData(data)
    }

    if (!getRegMalaysia()) {
      getRegistrationRecords()
    } else {
      const data = getRegMalaysia();
      setRegLoading(false);
      mapRegMalaysiaData(data);
    }

  }, [])

  const mapVaxMalaysiaData = (vaxData: any) => {
    const data: VaxMalaysia[] = processCSV(vaxData)
    const dates: string[] = [];

    data.forEach((res: VaxMalaysia) => {
        if (!dates.includes(res.date)) {
            dates.push(res.date)
        }
    })
    setVaccineDates(dates);
    setVaxTableData(data)
  }

  const getMalaysiaVaxData = async () => {
    const vaxMalaysiaData = await axios.get(
      'https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_malaysia.csv'
    );
    setVaxLoading(false);
    setVaxMalaysia(vaxMalaysiaData.data)
    mapVaxMalaysiaData(vaxMalaysiaData.data);
  }


  const mapRegMalaysiaData = (regData: any) => {
    const data: Registration[] = processCSV(regData)
    const dates: string[] = [];

    data.forEach((res: Registration) => {
        if (!dates.includes(res.date)) {
            dates.push(res.date)
        }
    })
    setRegistrationDates(dates);
    setRegTableData(data);
  }


  const getRegistrationRecords = async () => {
    const registrationData = await axios.get<string>(
      'https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_malaysia.csv'
    );
    setRegLoading(false);
    setRegMalaysia(registrationData.data);
    mapRegMalaysiaData(registrationData.data);
   
  }

  const onSelectChange = (event: any) => {
    const term = event.target.value;
    setSelectedDate(term);
    const vaccinationData = [...vaxTableData];
    const filteredVaccData: any[] = filterByDate(vaccinationData, term);
    setFilteredData(filteredVaccData);
  } 

  const onRegSelectChange = (event: any) => {
    const term = event.target.value;
    setSelectedRegDate(term);
    const registrationData = [...regTableData];
    const filteredRegData: any[] = filterByDate(registrationData, term);
    setFilteredRegData(filteredRegData);
  }

  return (
      <IonPage>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle>Vaccination Data</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol>
              <IonSegment className='ion-margin-top' value={segment.active} onIonChange={handleSegment}>
                  <IonSegmentButton value={segment.vaccination}>
                    <IonLabel>Vaccination</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value={segment.registration}>
                    <IonLabel>Registration</IonLabel>
                  </IonSegmentButton>
              </IonSegment>
              </IonCol>
            </IonRow>

            {
              segment.active === segment.vaccination ? (
                <Fragment>
                  <IonRow>
                    <IonCol size="10" offset='1'>
                      <h1>Malaysia Vaccination</h1>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="10" offset='1'>
                        <IonSelect value={selectedDate} placeholder="Select One" interface='popover' onIonChange={onSelectChange}>
                          <IonSelectOption value='All'>All</IonSelectOption>
                          { vaccineDates.map((date: any, index: number) => (
                            <IonSelectOption key={index}>{date}</IonSelectOption>
                            )) 
                          }
                        </IonSelect>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="10" offset='1'>
                      <DataTable columns={columns} data={filteredData && filteredData.length > 0 ? filteredData : vaxTableData} pagination={true} progressPending={vaxLoading} />
                    </IonCol>
                  </IonRow>
                </Fragment>
              )
              : (
                <Fragment>
                  <IonRow>
                    <IonCol size="10" offset='1'>
                      <h1>Malaysia Registaration Record</h1>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="10" offset='1'>
                      <IonSelect value={selectedRegDate} placeholder="Select One" interface='popover' onIonChange={onRegSelectChange}>
                        <IonSelectOption value='All'>All</IonSelectOption>
                        { registrationDates.map((date: any, index: number) => (
                          <IonSelectOption key={index}>{date}</IonSelectOption>
                          )) 
                        }
                      </IonSelect>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="10" offset='1'>
                      <DataTable columns={regColumns} data={filteredRegData && filteredRegData.length > 0 ? filteredRegData : regTableData} pagination={true} progressPending={regLoading}/>
                    </IonCol>
                  </IonRow>
                </Fragment>
              )
            }
          </IonGrid>
        </IonContent>
      </IonPage>
  );
};

export default Home;
