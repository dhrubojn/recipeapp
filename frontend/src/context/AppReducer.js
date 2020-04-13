export default (state, action) => {
    switch (action.type) {
        case 'SET_RECIPIES':
            return {
                ...state,
                recipies: action.payload
            };
        case 'REMOVE_RECIPE':
            return {
                ...state,
                recipies: state.recipies.filter(recipe => recipe.id !== action.payload)
            };
        case 'ADD_RECIPIE':
            return {
                ...state,
                recipies: [...state.recipies, action.payload]
            };
        case 'EDIT_RECIPIE':
            const updatedRecipie = action.payload;

            const updatedRecipies = state.recipies.map(recipie => {
                if (recipie.id === updatedRecipie.id) {
                    return updatedRecipie;
                }
                return recipie;
            });

            return {
                ...state,
                recipies: updatedRecipies
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default: return state;
    }
}