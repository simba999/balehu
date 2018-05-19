export const createNewBusiness = (data, dispatch) => {
	dispatch({ type: 'NEW_BUSINESS', payload: {data: data} });
}

export const changeBusinessStatus = (data, dispatch) => {
	dispatch({ type: 'CHANGE_BUSINESS', payload: {data: data} });	
}