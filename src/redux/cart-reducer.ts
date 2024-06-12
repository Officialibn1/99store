import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
	id: number;
	name: string;
	imageUrl: string;
	quantity: number;
	price: number;
}

const initialCartState: {
	products: CartItem[];
} = {
	products: [],
};

export const cartSlice = createSlice({
	name: "cart_slice",
	initialState: initialCartState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const item = state.products.find((item) => item.id === action.payload.id);

			if (item) {
				item.quantity += action.payload.quantity;
			} else {
				state.products.push({
					id: action.payload.id,
					name: action.payload.name,
					imageUrl: action.payload.imageUrl,
					quantity: action.payload.quantity,
					price: action.payload.price,
				});
			}
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const newState = state.products.filter(
				(item) => item.id !== action.payload,
			);

			state.products = newState;
		},
		incrementItemQuantity: (state, action: PayloadAction<number>) => {
			const item = state.products.find((item) => item.id === action.payload);

			if (item) {
				item.quantity++;
			}
		},
		decrementItemQuantity: (state, action: PayloadAction<number>) => {
			const item = state.products.find((item) => item.id === action.payload);

			if (item) {
				item.quantity--;
			}
		},
		resetCart: (state) => {
			state.products = [];
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	incrementItemQuantity,
	decrementItemQuantity,
	resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
