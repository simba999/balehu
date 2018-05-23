const initialState = {
  businesses: {
  	businessName: 'Food',
  	bussinessAddress: '123 6th St.',
  	city: 'Melbourne',
  	state: 'Florida',
  	zipcode: '32904',
  	contactName: 'John Doe',
  	email: 'agent@mail.com',
  	phone: '123-45-67-89'
  },
  signupInfo: {

  }
};

const reducer = (state = initialState, action) => {
	let businesses;
	switch(action.type) {
		case 'NEW_BUSINESS':
			businesses = Object.assign([], state.businesses);
			
			businesses.push(action.payload.data);
			businesses = businesses.map((data, key) => { let a = Object.assign({}, data); a['id'] = key; return a; });
			
			return { ...state, businesses: businesses };
		case 'CHANGE_BUSINESS':
			// businesses = Object.assign({}, state.businesses);
			// let idx = null;

			// businesses.map((data, key) => {
			// 	if (data.id == action.payload.data.id) {
			// 		idx = key;
			// 	}
			// })

			// if (idx != null) {
			// 	businesses[idx] = action.payload.data;
			// }
			businesses = action.payload.data;
			return { ...state, businesses: businesses };

		case 'CHANGE_SIGNUP_STATUS':
			let signupInfo = Object.assign({}, state.signupInfo, action.payload.data);
			return { ...state, signupInfo: signupInfo };

		default:
			return state;
	}
}

export default reducer;