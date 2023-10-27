import axios from "axios";

const path = 'http://localhost/api/';

const buildPayload = (state) => {
    let payload = {
        'name': state.name,
        'type': state.type,
        'gender': state.gender
    }
    if (state.breed === 'Can\'t find it?') {
        payload.nobreedReason = state.nobreedReason
        if (payload.nobreedReason === 'mix') {
            payload.mixbreed = state.mixbreed
        }
    } else {
        payload.breed = state.breed
    }
    return JSON.stringify(payload);
};

const state = () => ({
    'id': null,
    'name': '',
    'type': null,
    'breed': null,
    'nobreedReason': null,
    'mixbreed': null,
    'gender': '',
    'submitting': false,
    'redirect': null,
    'errors': {},
    'success': null,
    'server_error': null,
})

const getters = {
    isExisting: (state) => {
        return !!state.id
    },
    typeDisplay: (state) => {
        return state.type ?  state.type.toLowerCase() : 'pet'
    },
    noBreed: (state) => {
        return state.breed === 'Can\'t find it?'
    },
    isMix: (state) => {
        return state.breed === 'Can\'t find it?' && state.nobreedReason === 'mix'
    },
    hasError: (state) => {
        return Object.keys(state.errors).length > 0
    },
    hasServerError: (state) => {
        return !!state.server_error
    },
    getServerError: (state) => {
        return state.server_error
    },
    hasSuccess: (state) => {
        return !!state.success
    },
    getSuccess: (state) => {
        return state.success
    }
}

const actions = {
    async loadPet ({ state, commit }) {
        try {
            commit("setLoading", true);

            const response = await axios.get(
                path + 'pets/' + state.id
            );
            if (response.status !== 200) {
                throw new Error('Pet query endpoint did not return 200')
            }
            if (!response.data.data) {
                throw new Error('Pet query response is empty')
            }

            commit("setLoading", false);
            commit("setPet", response.data.data)
            commit("breeds/updateType", response.data.data.type, { root: true })
        } catch (e) {
            commit("setLoading", false);
            commit("setError", 'Pet could not be loaded');
            commit("unsetPet");
            commit("breeds/updateType", null, { root: true })
            commit("setRedirect", '/');
        }
    },
    async addPet ({ state, commit }) {
        try {
            commit("setSubmitting", true);

            // Build Payload
            const payload = buildPayload(state)

            // Send Request
            const response = await axios.post(
                path + 'pets/',
                payload,
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
            if (!response.data.data.id) {
                throw new Error('Newly created pet was not returned')
            }

            commit("setSubmitting", false);
            commit("setPet", response.data.data);
            commit("breeds/updateType", response.data.data.type, { root: true })
            commit("setSuccess", state.name + ' has been successfully added.');
            commit("setRedirect", '/' + state.id);
        } catch (e) {
            let error = e.message
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    error = e.response.data.message
                }
            }
            commit("setSubmitting", false);
            commit("setError", error);
        }
    },
    async editPet ({ state, commit }) {
        try {
            commit("setSubmitting", true);

            // Build Payload
            const payload = buildPayload(state)

            // Send Request
            const response = await axios.put(
                path + 'pets/' + state.id,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status !== 200) {
                throw new Error('Pet update endpoint did not return 200')
            }
            if (!response.data.data.id) {
                throw new Error('Updated pet was not returned')
            }

            commit("setSubmitting", false);
            commit("setPet", response.data.data);
            commit("breeds/updateType", response.data.data.type, { root: true })
            commit("setSuccess", state.name + ' has been successfully updated.');
        } catch (e) {
            commit("setSubmitting", false);
            commit("setError", e.message);
        }
    },
    validateName ({ state, commit }) {
        let validationErrors = []
        if (state.name.length === 0) {
            validationErrors.push('Pet Name is a required field.')
        }
        commit("setValidationErrors", {field: 'name', errors: validationErrors});
    },
    validateType ({ state, commit }) {
        let validationErrors = []
        if (state.type.length === 0) {
            validationErrors.push('Pet Type is a required field.')
        }
        if (state.type != 'dog' && state.type != 'cat') {
            validationErrors.push('Pet Type must be either dog or cat.')
        }
        commit("setValidationErrors", {field: 'type', errors: validationErrors});
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
    setSubmitting(state, submitting) {
        state.submitting = submitting
    },
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
    setId(state, id) {
        state.id = id
    },
    setPet(state, pet) {
        state.id = pet.id;
        state.name = pet.name;
        state.type = pet.type;
        state.breed = pet.breed;
        state.nobreedReason = pet.nobreedReason;
        state.mixbreed = pet.mixbreed;
        state.gender = pet.gender;
    },
    unsetPet(state) {
        state.id = null;
        state.name = '';
        state.type = '';
        state.breed = null;
        state.nobreedReason = null;
        state.mixbreed = null;
        state.gender = '';
    },
    updateName (state, name) {
        state.name = name
    },
    updateType (state, type) {
        state.type = type
    },
    updateBreed (state, breed) {
        state.breed = breed
    },
    updateNobreedReason (state, nobreedReason) {
        state.nobreedReason = nobreedReason
    },
    updateMixBreed (state, mixbreed) {
        state.mixbreed = mixbreed
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