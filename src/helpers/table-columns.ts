import VaxMalaysia from "../interfaces/vax_malaysia";
import Registration from "../interfaces/registration";
import VaxState from "../interfaces/vax_state";

export const columns = [
  {
    name: 'Date',
    selector: (row: VaxMalaysia) => row.date,
    sortable: true,
  },
  {
    name: 'Daily Partial',
    selector: (row: VaxMalaysia) => row.daily_partial,
    sortable: true,
  },
  {
    name: 'Daily Full',
    selector: (row: VaxMalaysia) => row.daily_full,
    sortable: true,
  },
  {
    name: 'Daily Booster',
    selector: (row: VaxMalaysia) => row.daily_booster,
    sortable: true,
  },
  {
    name: 'Daily',
    selector: (row: VaxMalaysia) => row.daily,
    sortable: true,
  },
  {
    name: 'Daily Partial Adol',
    selector: (row: VaxMalaysia) => row.daily_partial_adol,
    sortable: true,
  },
  {
    name: "Daily Full Adult",
    selector: (row: VaxMalaysia) => row.daily_full_adol,
    sortable: true
  },
  {
    name: "Daily Partial Child",
    selector: (row: VaxMalaysia) => row.daily_partial_child,
    sortable: true
  },
  {
    name: "Daily Full Child",
    selector: (row: VaxMalaysia) => row.daily_full_child,
    sortable: true
  },
  {
    name: "Cumulative Partial",
    selector: (row: VaxMalaysia) => row.cumul_partial,
    sortable: true
  },
  {
    name: "Cumulative Full",
    selector: (row: VaxMalaysia) => row.cumul_full,
    sortable: true
  },
  {
    name: "Cumulative Booster",
    selector: (row: VaxMalaysia) => row.cumul_booster,
    sortable: true
  },
  {
    name: "Cumulative",
    selector: (row: VaxMalaysia) => row.cumul,
    sortable: true
  },
  {
    name: "Cumulative Partial Adol",
    selector: (row: VaxMalaysia) => row.cumul_partial_adol,
    sortable: true
  },
  {
    name: "Cumulative Full Adol",
    selector: (row: VaxMalaysia) => row.cumul_full_adol,
    sortable: true
  },
  {
    name: "Cumulative Partial Child",
    selector: (row: VaxMalaysia) => row.cumul_partial_child,
    sortable: true
  },
  {
    name: "Cumulative Full Child",
    selector: (row: VaxMalaysia) => row.cumul_full_child,
    sortable: true
  },
  {
    name: "Pfizer 1",
    selector: (row: VaxMalaysia) => row.pfizer1,
    sortable: true
  },
  {
    name: "Pfizer 2",
    selector: (row: VaxMalaysia) => row.pfizer2,
    sortable: true
  },
  {
    name: "Pfizer 3",
    selector: (row: VaxMalaysia) => row.pfizer3,
    sortable: true
  },
  {
    name: "SinoVac 1",
    selector: (row: VaxMalaysia) => row.sinovac1,
    sortable: true
  },
  {
    name: "SinoVac 2",
    selector: (row: VaxMalaysia) => row.sinovac2,
    sortable: true
  },
  {
    name: "SinoVac 3",
    selector: (row: VaxMalaysia) => row.sinovac3,
    sortable: true
  },
  {
    name: "Astra 1",
    selector: (row: VaxMalaysia) => row.astra1,
    sortable: true
  },
  {
    name: "Astra 2",
    selector: (row: VaxMalaysia) => row.astra2,
    sortable: true
  },
  {
    name: "Astra 3",
    selector: (row: VaxMalaysia) => row.astra3,
    sortable: true
  },
  {
    name: "Sinopharm 1",
    selector: (row: VaxMalaysia) => row.sinopharm1,
    sortable: true
  },
  {
    name: "Sinopharm 2",
    selector: (row: VaxMalaysia) => row.sinopharm2,
    sortable: true
  },
  {
    name: "Sinopharm 3",
    selector: (row: VaxMalaysia) => row.sinopharm3,
    sortable: true
  },
  {
    name: "Cansino 1",
    selector: (row: VaxMalaysia) => row.cansino,
    sortable: true
  },
  {
    name: "Cansino 3",
    selector: (row: VaxMalaysia) => row.cansino3,
    sortable: true
  },
  {
    name: "Pending 1",
    selector: (row: VaxMalaysia) => row.pending1,
    sortable: true
  },
  {
    name: "Pending 2",
    selector: (row: VaxMalaysia) => row.pending2,
    sortable: true
  },
  {
    name: "Pending 3",
    selector: (row: VaxMalaysia) => row.pending3,
    sortable: true
  }
];

export const regColumns = [
  {
    name: 'Date',
    selector: (row: Registration) => row.date,
    sortable: true,
  },
  {
    name: 'State',
    selector: (row: Registration) => row.state,
    sortable: true,
  },
  {
    name: 'Total',
    selector: (row: Registration) => row.total,
    sortable: true,
  },
  {
    name: 'Phase 2',
    selector: (row: Registration) => row.phase2,
    sortable: true,
  },
  {
    name: 'MySJ',
    selector: (row: Registration) => row.mysj,
    sortable: true
  },
  {
    name: 'Call',
    selector: (row: Registration) => row.call,
    sortable: true
  },
  {
    name: 'Web',
    selector: (row: Registration) => row.web,
    sortable: true
  },
  {
    name: 'Children',
    selector: (row: Registration) => row.children,
    sortable: true
  },
  {
    name: 'Children Solo',
    selector: (row: Registration) => row.children_solo,
    sortable: true
  },
  {
    name: 'Adolescents',
    selector: (row: Registration) => row.adolescents,
    sortable: true
  },
  {
    name: 'Elderly',
    selector: (row: Registration) => row.elderly,
    sortable: true
  },
  {
    name: 'Comorbids',
    selector: (row: Registration) => row.comorb,
    sortable: true
  },
  {
    name: 'Oku',
    selector: (row: Registration) => row.oku,
    sortable: true
  },
]


export const stateVaxColumns = [
  {
    name: 'Date',
    selector: (row: VaxState) => row.date,
    sortable: true,
  },
  {
    name: 'State',
    selector: (row: VaxState) => row.state,
  },
  {
    name: 'Daily Partial',
    selector: (row: VaxState) => row.daily_partial,
    sortable: true,
  },
  {
    name: 'Daily Full',
    selector: (row: VaxState) => row.daily_full,
    sortable: true,
  },
  {
    name: 'Daily Booster',
    selector: (row: VaxState) => row.daily_booster,
    sortable: true,
  },
  {
    name: 'Daily',
    selector: (row: VaxState) => row.daily,
    sortable: true,
  },
  {
    name: 'Daily Partial Adol',
    selector: (row: VaxState) => row.daily_partial_adol,
    sortable: true,
  },
  {
    name: "Daily Full Adult",
    selector: (row: VaxState) => row.daily_full_adol,
    sortable: true
  },
  {
    name: "Daily Partial Child",
    selector: (row: VaxState) => row.daily_partial_child,
    sortable: true
  },
  {
    name: "Daily Full Child",
    selector: (row: VaxState) => row.daily_full_child,
    sortable: true
  },
  {
    name: "Cumulative Partial",
    selector: (row: VaxState) => row.cumul_partial,
    sortable: true
  },
  {
    name: "Cumulative Full",
    selector: (row: VaxState) => row.cumul_full,
    sortable: true
  },
  {
    name: "Cumulative Booster",
    selector: (row: VaxState) => row.cumul_booster,
    sortable: true
  },
  {
    name: "Cumulative",
    selector: (row: VaxState) => row.cumul,
    sortable: true
  },
  {
    name: "Cumulative Partial Adol",
    selector: (row: VaxState) => row.cumul_partial_adol,
    sortable: true
  },
  {
    name: "Cumulative Full Adol",
    selector: (row: VaxState) => row.cumul_full_adol,
    sortable: true
  },
  {
    name: "Cumulative Partial Child",
    selector: (row: VaxState) => row.cumul_partial_child,
    sortable: true
  },
  {
    name: "Cumulative Full Child",
    selector: (row: VaxState) => row.cumul_full_child,
    sortable: true
  },
  {
    name: "Pfizer 1",
    selector: (row: VaxState) => row.pfizer1,
    sortable: true
  },
  {
    name: "Pfizer 2",
    selector: (row: VaxState) => row.pfizer2,
    sortable: true
  },
  {
    name: "Pfizer 3",
    selector: (row: VaxState) => row.pfizer3,
    sortable: true
  },
  {
    name: "SinoVac 1",
    selector: (row: VaxState) => row.sinovac1,
    sortable: true
  },
  {
    name: "SinoVac 2",
    selector: (row: VaxState) => row.sinovac2,
    sortable: true
  },
  {
    name: "SinoVac 3",
    selector: (row: VaxState) => row.sinovac3,
    sortable: true
  },
  {
    name: "Astra 1",
    selector: (row: VaxState) => row.astra1,
    sortable: true
  },
  {
    name: "Astra 2",
    selector: (row: VaxState) => row.astra2,
    sortable: true
  },
  {
    name: "Astra 3",
    selector: (row: VaxState) => row.astra3,
    sortable: true
  },
  {
    name: "Sinopharm 1",
    selector: (row: VaxState) => row.sinopharm1,
    sortable: true
  },
  {
    name: "Sinopharm 2",
    selector: (row: VaxState) => row.sinopharm2,
    sortable: true
  },
  {
    name: "Sinopharm 3",
    selector: (row: VaxState) => row.sinopharm3,
    sortable: true
  },
  {
    name: "Cansino 1",
    selector: (row: VaxState) => row.cansino,
    sortable: true
  },
  {
    name: "Cansino 3",
    selector: (row: VaxState) => row.cansino3,
    sortable: true
  },
  {
    name: "Pending 1",
    selector: (row: VaxState) => row.pending1,
    sortable: true
  },
  {
    name: "Pending 2",
    selector: (row: VaxState) => row.pending2,
    sortable: true
  },
  {
    name: "Pending 3",
    selector: (row: VaxState) => row.pending3,
    sortable: true
  }
]