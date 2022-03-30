const now = new Date()

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

export const setVaxMalaysia = (value: string) => {

    const vaccincationData = {
		value,
		expiry: now.getTime() + ONE_DAY_IN_MS,
	}

    localStorage.setItem('vax_malaysia', JSON.stringify(vaccincationData));
}

export const setRegMalaysia = (value: string) =>  {

    const registrationData = {
		value,
		expiry: now.getTime() + ONE_DAY_IN_MS,
	}
    localStorage.setItem('reg_malaysia', JSON.stringify(registrationData));
}

export const setVaxState = (value: string) =>  {

    const vaccinationState = {
		value,
		expiry: now.getTime() + ONE_DAY_IN_MS,
	}

    localStorage.setItem('vax_state', JSON.stringify(vaccinationState));
}

export const setRegState = (value: string) => {

    const registrationState = {
        value,
        expiry: now.getTime() + ONE_DAY_IN_MS,
    }
    localStorage.setItem('reg_state', JSON.stringify(registrationState));
}


export const getVaxMalaysia = () => {
    const vaccinationValueStr = localStorage.getItem('vax_malaysia');

    if (!vaccinationValueStr) {
        return null;
    }

    const vaccinationValue = JSON.parse(vaccinationValueStr);
    
    if (now.getTime() > vaccinationValue.expiry) {
        localStorage.removeItem('vax_malaysia');
        return null;
    }

    return vaccinationValue.value;
}

export const getRegMalaysia = () => {
    const regValueStr = localStorage.getItem('reg_malaysia');

    if (!regValueStr) {
        return null;
    }

    const regValue = JSON.parse(regValueStr);

    if (now.getTime() > regValue.expiry) {
        localStorage.removeItem('reg_malaysia');
        return null;
    }

    return regValue.value;
}

export const getVaxState = () => {
    const vaccinationStateStr = localStorage.getItem('vax_state');

    if (!vaccinationStateStr) {
        return null;
    }

    const vaccinationState = JSON.parse(vaccinationStateStr);

    if (now.getTime() > vaccinationState.expiry) {
        localStorage.removeItem('vax_state');
        return null;
    }

    return vaccinationState.value;
}

export const getRegState = () => {
    const regStateStr = localStorage.getItem('reg_state');

    if (!regStateStr) {
        return null;
    }

    const regState = JSON.parse(regStateStr);

    if (now.getTime() > regState.expiry) {
        localStorage.removeItem('reg_state');
        return null;
    }

    return regState.value;
} 