const initialState = {
  documents: []
};

const myModelReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_DOCUMENTS':
      return { ...state, documents: action.payload };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc._id === action.payload._id ? action.payload : doc
        ),
      };
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter((doc) => doc._id !== action.payload),
      };
    default:
      return state;
  }
};

export default myModelReducer;