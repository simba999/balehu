const initialState = {
  promotions: [],
};

const reducer = (state = initialState, action) => {
	let promotions;
	switch(action.type) {
		case 'NEW_PROMOTION':
			promotions = Object.assign([], state.promotions);
			
			promotions.push(action.payload.data);
			promotions = promotions.map((data, key) => { let a = Object.assign({}, data); a['id'] = key; return a; });
			
			return { ...state, promotions: promotions };
		case 'CHANGE_PROMOTION':
			promotions = Object.assign([], state.promotions);
			let idx = null;

			promotions.map((data, key) => {
				if (data.id == action.payload.data.id) {
					idx = key;
				}
			})

			if (idx != null) {
				promotions[idx] = action.payload.data;
			}
			return { ...state, promotions: promotions };

		default:
			return state;
	}
}

export default reducer;