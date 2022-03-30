/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react';
import { IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import DataTable from 'react-data-table-component';
import axios from 'axios'

import './State.css';
import { stateVaxColumns, regColumns  } from '../helpers/table-columns';
import { processCSV } from '../helpers/processCSV';
import { setVaxState, getVaxState, setRegState, getRegState } from '../helpers/storage';
import VaxState from '../interfaces/vax_state';
import Registration from '../interfaces/registration';
import filterByDate from '../pipes/filterByDate';


const State: React.FC = () => {

    const [vaxLoading, setVaxLoading] = useState(true);
    const [regLoading, setRegLoading] = useState(true);

    const [tableData, setTableData]: any[] = useState([]); 
    const [regTableData, setRegTableData]: any[]= useState([]);
    const [vaccineDates, setVaccineDates] = useState<string[]>([]);
    const [registrationDates, setRegistrationDates]: any[] = useState([]);
    const [segment, setSegment]: any = useState(
      {
        vaccination: 'vaccination',
        registration: 'registration',
        active: 'vaccination'
      }
    )
    const [selectedDate, setSelectedDate] = useState([]);
    const [selectedRegDate, setSelectedRegDate] = useState<string>();
    const [filteredData,setFilteredData] = useState<any[]>([]);
    const [filteredRegData,setFilteredRegData] = useState<any[]>([]);

    const handleSegment = (event: any) => {
        setSegment((res: any) => ({...res, active: event.detail.value}))
      }

    useEffect(() => {
        if (!getVaxState()) {
            getStateVaccination();
        } else {
            const data = getVaxState();
            setVaxLoading(false);
            mapStateVaxData(data);
        }

        if (!getRegState()) {
            getStateRegistration();
        } else {
            const data = getRegState();
            setRegLoading(false);
            mapStateRegData(data);
        }
    }, [])


    const mapStateVaxData = (value: any) => {
        const data: VaxState[] = processCSV(value)
        const dates: string[] = [];

        data.forEach((res: VaxState) => {
            if (!dates.includes(res.date)) {
                dates.push(res.date)
            }
        })
        setVaccineDates(dates);
        setTableData(data)
    }

    const getStateVaccination = async () => {
        const stateVax = await axios.get('https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_state.csv');
        setVaxLoading(false);
        setVaxState(stateVax.data);
        mapStateVaxData(stateVax.data);
    }

    const mapStateRegData = (value: any) => {
        const data: Registration[] = processCSV<Registration>(value);
        const dates: string[] = [];

        data.forEach((res: Registration) => {
            if (!dates.includes(res.date)) {
                dates.push(res.date)
            }
        })
        setRegistrationDates(dates);

        setRegTableData(data);
    }

    const getStateRegistration = async () => {
        const stateRegistration = await axios.get('https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/registration/vaxreg_state.csv');
        setRegLoading(false);
        setRegState(stateRegistration.data);
        mapStateRegData(stateRegistration.data);
    }

    const onSelectChange = (event: any) => {
        const term = event.target.value;
        setSelectedDate(term);
        const stateVaccData = [...tableData];
        const filteredVaccData: any[] = filterByDate(stateVaccData, term);
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
                <IonToolbar>
                    <IonTitle>Malaysia States</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
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
                            <h1>State Vaccination</h1>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset='1'>
                            <IonSelect value={selectedDate} placeholder="Select One" interface='popover' onIonChange={onSelectChange}>
                                <IonSelectOption value="All">All</IonSelectOption>
                                { vaccineDates.map((date: any, index: number) => (
                                <IonSelectOption key={index}>{date}</IonSelectOption>
                                )) 
                                }
                            </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset='1'>
                            <DataTable columns={stateVaxColumns} data={filteredData && filteredData.length > 0 ? filteredData : tableData} pagination={true} progressPending={vaxLoading}/>
                            </IonCol>
                        </IonRow>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                        <IonRow>
                            <IonCol size="10" offset='1'>
                            <h1>State Registaration Record</h1>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset='1'>
                            <IonSelect value={selectedRegDate}  placeholder="Select One" interface='popover' onIonChange={onRegSelectChange}>
                            <IonSelectOption value="All">All</IonSelectOption>
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
    )
}

export default State;