import {createSlice} from '@reduxjs/toolkit';


const cartSlice=createSlice(
    {
        name:'cart',
        initialState: {
            products: [],
            total: 0,
            quantity:{},
          },
        reducers:{
            add(state,action){
                const product=action.payload;

                if (!state.products.find(item => item.id === product.id)) {
                    state.products.push(product);
                }
                const existingProduct = state.products.find((item) => item.id === product.id);
                state.quantity[product.id] = 1;
                state.total = state.products.reduce((sum, product) => {
                    const qty = state.quantity[product.id] || 0;
                    return sum + product.price * qty}, 0);
            },
            
            addItem(state,action){
                const product=action.payload;
                if (state.products.find(item => item.id === product.id)) {
                    state.quantity[product.id] += 1;

                    state.total = state.products.reduce((sum, product) => {
                        const qty = state.quantity[product.id] || 0;
                        return sum + product.price * qty
                    }, 0);
                }
            },

            remove(state,action){
                const product=action.payload;
                state.quantity[product.id] = 0;
                state.total = state.products.reduce((sum, product) => {
                    const qty = state.quantity[product.id] || 0;
                    return sum + product.price * qty}, 0);
                
                state.products = state.products.filter(product => product.id !== action.payload.id);
            },

            removeItem(state,action){
                const product=action.payload;
                state.quantity[product.id] -= 1;
                state.total = state.products.reduce((sum, product) => {
                    const qty = state.quantity[product.id] || 0;
                    return sum + product.price * qty}, 0);
                if( state.quantity[product.id] < 1)
                {
                    state.products = state.products.filter(product => product.id !== action.payload.id);
                }
            },

            setTotal(state) {
                state.total = state.products.reduce((sum, product) => {
                    const qty = state.quantity[product.id] || 0;
                    return sum + product.price * qty}, 0);
            },
        }
    });

export const {add,addItem,remove,removeItem,setTotal} =cartSlice.actions;
export default cartSlice.reducer;


