export const createNewPromotion = (data, dispatch) => {
	console.log(data);
	dispatch({ type: 'NEW_PROMOTION', payload: {data: data} });
}