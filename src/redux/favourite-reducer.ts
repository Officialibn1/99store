import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavouriteItem {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
	description: string;
}

const initialFavouriteState: {
	products: FavouriteItem[];
} = {
	products: [],
};

export const favouriteSlice = createSlice({
	name: "favourite_slice",
	initialState: initialFavouriteState,
	reducers: {
		addOrRemoveItem: (state, action: PayloadAction<FavouriteItem>) => {
			const item = state.products.find((item) => item.id === action.payload.id);

			if (item) {
				const newState = state.products.filter(
					(filterItem) => filterItem.id !== item.id,
				);

				state.products = newState;
			} else {
				state.products.push({
					id: action.payload.id,
					name: action.payload.name,
					imageUrl: action.payload.imageUrl,
					price: action.payload.price,
					description: action.payload.description,
				});
			}
		},
	},
});

export const { addOrRemoveItem } = favouriteSlice.actions;

export default favouriteSlice.reducer;
