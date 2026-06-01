import { Product } from '@/product/types';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface ItemEntry {
	product: Product;
	quantity: number;
	size: string,
}
interface Store {
	/**
	 * The products in the cart.
	 * key: product id
	 * @type Map<string, ItemEntry>
	 */
	cartItems: {
		[key: string]: ItemEntry
	};
	addToCart: (product: Product) => void;
	removeFromCart: (product: Product) => void;
	incrementQuantity: (product: Product) => void;
	decrementQuantity: (product: Product) => void;
	setProductSize: (product: Product, size: string) => void;
}

export const useStore = create<Store, [["zustand/persist", {}]]>(persist((set, get) => ({
	cartItems: {},
	addToCart: (product: Product) => {
		const cartItems = get().cartItems;
		set({
			cartItems: {
				...cartItems,
				[product.id]: {
					product,
					quantity: (cartItems[product.id]?.quantity ?? 0) + 1,
					size: (cartItems[product.id]?.size ?? 'S')
				}
			}
		})
	},
	removeFromCart: (product: Product) => {
		const cartItems = get().cartItems;
		const { [product.id]: _, ...rest } = cartItems;
		set({ cartItems: rest });
	},
	incrementQuantity: (product: Product) => {
		const cartItems = get().cartItems;
		set({
			cartItems: {
				...cartItems,
				[product.id]: {
					product,
					quantity: cartItems[product.id].quantity + 1,
					size: cartItems[product.id].size
				}
			}
		})
	},
	decrementQuantity: (product: Product) => {
		const cartItems = get().cartItems;
		set({
			cartItems: {
				...cartItems,
				[product.id]: {
					product,
					quantity: cartItems[product.id].quantity - 1,
					size: cartItems[product.id].size
				}
			}
		})
	},
	setProductSize: (product: Product, size: string) => {
		const cartItems = get().cartItems;
		set({
			cartItems: {
				...cartItems,
				[product.id]: {
					product,
					quantity: cartItems[product.id].quantity,
					size
				}
			}
		})
	}
}), {
	name: 'cart-storage'
}));

interface Cart {
	open: boolean,
	setOpen: (open: boolean) => void,
}

export const useCart = create<Cart>(set => ({
	open: false,
	setOpen: (open: boolean) => set({ open }),
}))