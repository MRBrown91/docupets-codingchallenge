# Coding Test Frontend

## Changes Made
- Implements Vue as primary framework, with bootstrap for styling
- Uses bootstrap classes and structure to maintain responsiveness with minimal manual css 
- Created PetForm component to structure for form
- Field, RadioButton and RadioGroup components used for repeated elements
- Component submits data and seamlessly transitions to editing
- Previously submitted components can be edited by navigating to a url including their id

## Future Considerations
- Further breakdown PetForm into individual components; especially notification block, submit button and text inputs
- Implement unit tests of components via Vitest
- Break Axios API calls into their own class
- Move validation into its own vuex store
- Implement List Vue component