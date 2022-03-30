/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItemDivider,
  IonLabel,
} from "@ionic/react";
import { Bar, Chart } from "react-chartjs-2";

import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

import {
  getVaxState,
  getVaxMalaysia,
  setVaxMalaysia,
  setVaxState,
} from "../helpers/storage";
import { processCSV } from "../helpers/processCSV";
import axios from "axios";
import VaxState from "../interfaces/vax_state";

const Statistics = () => {
  const [labelFullVaccinatedState, setLabelFullVaccinatedState]: any[] = useState([]);
  const [dataFullVaccinatedState, setDataFullVaccinatedState]: any[] = useState([]);

  const [labelWeeklyFullyVaccinated, setLabelWeeklyFullyVaccinated]: any[] = useState([]);
  const [
    dataWeeklyFullyVaccinatedAdult,
    setDataWeeklyFullyVaccinatedAdult,
  ]: any[] = useState([]);
  const [
    dataWeeklyFullyVaccinatedChild,
    setDataWeeklyFullyVaccinatedChild,
  ]: any[] = useState([]);

  const [labelsTotalVaccByVaxType, setLabelsTotalVaccByVaxType]: any[] =
    useState([]);
  const [dataTotalVaccByPfizer, setDataTotalVaccByPfizer]: any[] = useState([]);
  const [dataTotalVaccBySinovac, setDataTotalVaccBySinovac]: any[] = useState(
    []
  );

  const [heighestAdultVaccinated, setHeighestAdultVaccinated]: any[] =
    useState();

  useEffect(() => {
    getVaccineData();
  }, []);

  // Compute the sum of fully vaccinated people by state and/or by month
  const mapFullyVaccinated = (value: any) => {
    const convertedData: VaxState[] = processCSV<VaxState>(value);
    convertedData.pop();
    const fullyVaccinated: any[] = convertedData.reduce((acc: any[], curr: VaxState) => {
      const index = acc.findIndex((res: VaxState) => res.state === curr.state);
      if (index === -1) {
        acc.push({
          state: curr.state,
          sum: +curr.cumul_full,
        });
      } else {
        acc[index].sum += +curr.cumul_full;
      }
      return acc;
    }, []);

    const labels: any = [];
    const data: any = [];

    fullyVaccinated.forEach((res: any) => {
      labels.push(res.state);
      data.push(res.sum);
    });

    setLabelFullVaccinatedState(labels);
    setDataFullVaccinatedState(data);
  };

  // Find the highest and lowest the vaccination taken weekly for adult and child
  // Display the total number of vaccination by vaccine type  Pfizer and Sinovac weekly
  const mapHighestWeeklyVaccinated = (value: any) => {
    const convertedData: any[] = processCSV(value);
    convertedData.pop();
    const startDate = new Date(convertedData[0].date);
    const endDate = new Date(convertedData.slice(-1)[0].date);

    const weeklyVaccinated: any[] = [];
    const totalVaccineByVaccineType: any = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 7)) {
      const start = new Date(d.getTime());
      const end = new Date(d.getTime());
      end.setDate(end.getDate() + 7);

      const weeklyData = convertedData.filter((res: any) => {
        const date = new Date(res.date);
        return date >= start && date < end;
      });

      const weeklyVaccineByPfizer = weeklyData.reduce((acc, curr) => {
        return acc + +curr.pfizer1 + +curr.pfizer2 + +curr.pfizer3;
      }, 0);
      const weeklyVaccineBySinovac = weeklyData.reduce((acc, curr) => {
        return acc + +curr.sinovac1 + +curr.sinovac2 + +curr.sinovac3;
      }, 0);

      const weeklyVaccinatedAdult = weeklyData.reduce((acc, curr) => {
        return acc + +curr.daily_full_adol;
      }, 0);
      const weeklyVaccinatedChild = weeklyData.reduce((acc, curr) => {
        return acc + +curr.daily_full_child;
      }, 0);

      totalVaccineByVaccineType.push({
        startDate: start,
        endDate: end,
        pfizer: weeklyVaccineByPfizer,
        sinovac: weeklyVaccineBySinovac,
      });

      weeklyVaccinated.push({
        startDate: start,
        endDate: end,
        weeklyVaccinatedAdult: weeklyVaccinatedAdult,
        weeklyVaccinatedChild: weeklyVaccinatedChild,
      });
    }

    const heighestAdultVaccinated = weeklyVaccinated.reduce((acc, curr) =>
      curr.weeklyVaccinatedAdult > acc.weeklyVaccinatedAdult ? curr : acc
    );
    setHeighestAdultVaccinated(heighestAdultVaccinated);

    const labels: any = [];
    const dataAdult: any = [];
    const dataChild: any = [];

    weeklyVaccinated.forEach((res: any) => {
      labels.push(`${res.startDate.getDate()}-${res.endDate.getDate()}`);
      dataAdult.push(res.weeklyVaccinatedAdult);
      dataChild.push(res.weeklyVaccinatedChild);
    });

    setLabelWeeklyFullyVaccinated(labels);
    setDataWeeklyFullyVaccinatedAdult(dataAdult);
    setDataWeeklyFullyVaccinatedChild(dataChild);

    const labelsVaccineType: any = [];
    const dataPfizer: any = [];
    const dataSinovac: any = [];

    totalVaccineByVaccineType.forEach((res: any) => {
      labelsVaccineType.push(
        `${res.startDate.getDate()}-${res.endDate.getDate()}`
      );
      dataPfizer.push(res.pfizer);
      dataSinovac.push(res.sinovac);
    });

    setLabelsTotalVaccByVaxType(labelsVaccineType);
    setDataTotalVaccByPfizer(dataPfizer);
    setDataTotalVaccBySinovac(dataSinovac);
  };

  const getVaccinationMalaysia = async () => {
    const vaxMalaysiaData = await axios.get(
      "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_malaysia.csv"
    );
    setVaxMalaysia(vaxMalaysiaData.data);
    mapHighestWeeklyVaccinated(vaxMalaysiaData.data);
  };

  const getStateVaccination = async () => {
    const stateVax = await axios.get(
      "https://raw.githubusercontent.com/CITF-Malaysia/citf-public/main/vaccination/vax_state.csv"
    );
    setVaxState(stateVax.data);
    mapFullyVaccinated(stateVax.data);
  };

  const getVaccineData = () => {
    if (!getVaxState()) {
      getStateVaccination();
    } else {
      const stateVaxData = getVaxState();
      mapFullyVaccinated(stateVaxData);
    }

    if (!getVaxMalaysia()) {
      getVaccinationMalaysia();
    } else {
      const malaysiaVaxData = getVaxMalaysia();
      mapHighestWeeklyVaccinated(malaysiaVaxData);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Covid Statitics</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IonCol className="ion-margin" size="5">
              <IonText className="ion-margin-bottom">
                <h1>Sum of fully vaccinated people by state</h1>
              </IonText>
              <Bar
                data={{
                  labels: labelFullVaccinatedState,
                  datasets: [
                    {
                      label: "State",
                      backgroundColor: "rgba(75,192,192,1)",
                      borderColor: "rgba(0,0,0,1)",
                      borderWidth: 1,
                      data: dataFullVaccinatedState,
                    },
                  ],
                }}
              />
            </IonCol>
            <IonCol className="ion-margin" size="5">
              <IonText>
                <h1>
                  Highest and Lowest vaccination taken weekly for adult and
                  child
                </h1>
                <IonLabel style={{ fontWeight: '500' }}>Heighest week of total of adult vaccinted:</IonLabel>
                <br />
                <IonLabel>
                  {"Date: " +
                    heighestAdultVaccinated?.startDate.toLocaleDateString() +
                    "-" +
                    heighestAdultVaccinated?.endDate.toLocaleDateString()}
                </IonLabel>
                <br />
                <IonLabel>
                  Total: {heighestAdultVaccinated?.weeklyVaccinatedAdult}
                </IonLabel>
              </IonText>
              <Chart
                data={{
                  labels: labelWeeklyFullyVaccinated,
                  datasets: [
                    {
                      label: "Weekly Vaccinated Adult",
                      data: dataWeeklyFullyVaccinatedAdult,
                      backgroundColor: "rgba(75,192,192,0.8)",
                      borderColor: "rgba(0,0,0,0.7)",
                    },
                    {
                      label: "Weekly Vaccinated Child",
                      data: dataWeeklyFullyVaccinatedChild,
                      type: "line",
                      fill: false,
                      backgroundColor: "rgba(255, 165, 0)",
                    },
                  ],
                }}
                type={"bar"}
              />
            </IonCol>
          </IonRow>

          <IonItemDivider style={{ minHeight: "10px" }}></IonItemDivider>

          <IonRow
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <IonCol className="ion-margin" size="5">
              <IonText className="ion-margin-bottom">
                <h1>
                  Total number of vaccination by vaccine type Pfizer and Sinovac
                  weekly
                </h1>
              </IonText>
              <Bar
                data={{
                  labels: labelsTotalVaccByVaxType,
                  datasets: [
                    {
                      label: "Pfizer weekly ",
                      data: dataTotalVaccByPfizer,
                      backgroundColor: "rgba(75,192,192)",
                      borderColor: "rgba(0,0,0,1)",
                    },
                    {
                      label: "Sinovac weekly",
                      data: dataTotalVaccBySinovac,
                      backgroundColor: "rgba(255, 165, 0)",
                      borderColor: "rgba(0,0,0,0.7)",
                    },
                  ],
                }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Statistics;
