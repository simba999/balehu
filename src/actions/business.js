export const createNewBusiness = (data, dispatch) => {
	dispatch({ type: 'NEW_BUSINESS', payload: {data: data} });
}

export const changeBusinessStatus = (data, dispatch) => {
	dispatch({ type: 'CHANGE_BUSINESS', payload: {data: data} });	
}

export const changeSignupStatus = (data, dispatch) => {
	console.log('action:', data)
	dispatch({ type: 'CHANGE_SIGNUP_STATUS', payload: {data: data} });
}