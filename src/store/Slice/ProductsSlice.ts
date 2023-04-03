import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IProduct from '../../types/Product'

type ProductApi = IProduct[] | null;

interface IProductSlice {
    products: ProductApi,
    searchProducts: ProductApi,
    status: 'loading' | 'error' | 'idle'
}

const initialState: IProductSlice = {
    products: [],
    searchProducts: [],
    status: 'idle'
}

export const fetchProducts = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
    'products/fetchProducts',
    async function (_, { rejectWithValue }) {
        const response = await fetch('https://dummyjson.com/products');

        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }

        const data = await response.json();

        return data.products;
    }
);
export const fetchProductByName = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
    'products/fetchProductByName',
    async function (name: string, { rejectWithValue }) {
        const response = await fetch(`https://dummyjson.com/products/search?q=${name}`);

        if (!response.ok) {
            return rejectWithValue('Server Error!');
        }

        const data = await response.json();

        return data.products;
    }
);

export const deleteProduct = createAsyncThunk<string, string, { rejectValue: string }>(
    'products/deleteProduct',
    async function (id, { rejectWithValue }) {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            return rejectWithValue('Can\'t delete task. Server error.');
        }

        return id;
    }
);

export const addNewProduct = createAsyncThunk<IProduct, string, { rejectValue: string }>(
    'products/addNewProduct',
    async function (obj, { rejectWithValue }) {


        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: obj
        });

        if (!response.ok) {
            return rejectWithValue('Can\'t add task. Server error.');
        }

        return (await response.json()) as IProduct;
    }
);


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = 'idle'
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'error'
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products?.filter((product) => product.id !== action.payload)
            })
            .addCase(fetchProductByName.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProductByName.fulfilled, (state, action) => {
                state.searchProducts = action.payload;
                state.status = 'idle'
            })
            .addCase(fetchProductByName.rejected, (state) => {
                state.status = 'error'
            })


    }

})

export default productSlice.reducer;