import axios from "axios";

const path = 'http://localhost/api/';

const state = () => ({
    'petId': null,
    'petName': '',
    'petType': null,
    'breed': '',
    'noBreedReason': null,
    'mixBreed': null,
    'gender': '',
    'loading': false,
    'redirect': null,
    'success': null,
    'errors': {},
    'server_error': null,
})

const getters = {
    isExisting: (state) => {
        return !!state.petId
    },
    petTypeDisplay: (state) => {
        return state.petType ?  state.petType.toLowerCase() : 'pet'
    },
    noBreed: (state) => {
        return state.breed === 'Can\'t find it?'
    },
    isMix: (state) => {
        return state.breed === 'Can\'t find it?' && state.noBreedReason === 'mix'
    },
    hasError: (state) => {
        return Object.keys(state.errors).length > 0
    },
    hasServerError: (state) => {
        return !!state.server_error
    },
    getServerError: (state) => {
        return state.server_error
    }
}

const actions = {
    async loadPet ({ state, commit }) {
        try {
            const response = await axios.get(
                path + 'pets/' + state.petId
            );
            if (response.status !== 200) {
                throw new Error('Pet query endpoint did not return 200')
            }
            if (!response.data) {
                throw new Error('Pet query response is empty')
            }
            if (response.data.status !== 'success') {
                throw new Error('Pet query did not return a success')
            }

            commit("setPet", response.data.pet)
        } catch (e) {
            commit("unsetPet");
        }
    },
    async addPet ({ state, commit }) {
        try {
            commit("setLoading", true);

            // Build Payload
            const json = JSON.stringify({
                'petName': state.petName,
                'petType': state.petType,
                'breed': state.breed,
                'gender': state.gender
            });

            // Send Request
            const response = await axios.post(
                path + 'pets/',
                json,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Check For Errors
            if (response.status !== 201) {
                throw new Error('Pet create endpoint did not return 201')
            }
            if (response.data.status !== 'success') {
                throw new Error('Pet create did not return a success')
            }
            if (!response.data.pet) {
                throw new Error('Newly created pet was not returned')
            }
            if (!response.data.pet.petId) {
                throw new Error('Newly created pet id was not returned')
            }

            commit("setLoading", false);
            commit("setPet", response.data.pet);
            commit("setSuccess", state.petName + ' has been successfully added.');
            commit("setRedirect", '/');
        } catch (e) {
            commit("setLoading", false);
            commit("setError", e.message);
        }
    },
    async editPet ({ state, commit }) {
        try {
            commit("setLoading", true);

            // Build Payload
            const json = JSON.stringify({
                'petName': state.petName,
                'petType': state.petType,
                'breed': state.breed,
                'gender': state.gender
            });

            // Send Request
            const response = await axios.put(
                path + 'pets/' + state.petId,
                json,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Check For Errors
            if (response.status != 200) {
                throw new Error('Pet update endpoint did not return 200')
            }
            if (response.data.status != 'success') {
                throw new Error('Pet update did not return a success')
            }
            if (!response.data.pet) {
                throw new Error('Updated pet was not returned')
            }
            if (!response.data.pet.petId) {
                throw new Error('Updated pet id was not returned')
            }

            commit("setLoading", false);
            commit("setPet", response.data.pet);
            commit("setSuccess", state.petName + ' has been successfully updated.');
            commit("setRedirect", '/');
        } catch (e) {
            commit("setLoading", false);
            commit("setError", e.message);
        }
    },
    validatePetName ({ state, commit }) {
        let validationErrors = []
        if (state.petName.length === 0) {
            validationErrors.push('Pet Name is a required field.')
        }
        commit("setValidationErrors", {field: 'petName', errors: validationErrors});
    },
    validatePetType ({ state, commit }) {
        let validationErrors = []
        if (state.petType.length === 0) {
            validationErrors.push('Pet Type is a required field.')
        }
        if (state.petType != 'dog' && state.petType != 'cat') {
            validationErrors.push('Pet Type must be either dog or cat.')
        }
        commit("setValidationErrors", {field: 'petType', errors: validationErrors});
    },
    validateBreed ({ state, commit }) {
        let validationErrors = []
        if (state.breed.length === 0) {
            validationErrors.push('Breed is a required field.')
        }
        commit("setValidationErrors", {field: 'breed', errors: validationErrors});
    },
    validateGender ({ state, commit }) {
        let validationErrors = []
        if (state.gender.length === 0) {
            validationErrors.push('Gender is a required field.')
        }
        if (state.gender != 'male' && state.gender != 'female') {
            validationErrors.push('Gender must be either Female or Male.')
        }
        commit("setValidationErrors", {field: 'gender', errors: validationErrors});
    },
}

const mutations = {
    setLoading(state, loading) {
        state.loading = loading
    },
    setRedirect(state, redirect) {
        state.redirect = redirect
    },
    setSuccess(state, success) {
        state.success = success
    },
    setError(state, error) {
        state.server_error = error
    },
    setPetId(state, petId) {
        state.petId = petId
    },
    setPet(state, pet) {
        state.petId = pet.petId;
        state.petName = pet.petName;
        state.petType = pet.petType;
        state.breed = pet.breed;
        state.gender = pet.gender;
    },
    unsetPet(state) {
        state.petId = null;
        state.petName = '';
        state.petType = '';
        state.breed = '';
        state.gender = '';
    },
    updatePetName (state, petName) {
        state.petName = petName
    },
    updatePetType (state, petType) {
        state.petType = petType
    },
    updateBreed (state, breed) {
        state.breed = breed
    },
    updateNoBreedReason (state, noBreedReason) {
        state.noBreedReason = noBreedReason
    },
    updateMixBreed (state, mixBreed) {
        state.mixBreed = mixBreed
    },
    updateGender (state, gender) {
        state.gender = gender
    },
    setValidationErrors (state, payload) {
        let currentErrors = state.errors;
        if (payload.errors.length > 0) {
            currentErrors[payload.field] = payload.errors
        } else {
            delete currentErrors[payload.field]
        }
        state.errors = currentErrors
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}