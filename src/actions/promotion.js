export const createNewPromotion = (data, dispatch) => {
	dispatch({ type: 'NEW_PROMOTION', payload: {data: data} });
}

export const changePromotionStatus = (data, dispatch) => {
	dispatch({ type: 'CHANGE_PROMOTION', payload: {data: data} });	
}