const initialState = {
  promotions: [],
};

const reducer = (state = initialState, action) => {
	let promotions;
	switch(action.type) {
		case 'NEW_PROMOTION':
			promotions = Object.assign([], state.promotions);
			promotions.push(action.payload.data);
			return { ...state, promotions: promotions };
		default:
			return state;
	}
}

export default reducer;