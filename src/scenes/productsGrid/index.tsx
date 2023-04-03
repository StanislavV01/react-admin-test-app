import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridSelectionModel } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from '../../components/Header/Header'
import ProgressCircle from '../../components/ProgressCircle'
import { useAppDispatch, useAppSelector } from '../../hooks/useHook';
import { fetchProducts } from '../../store/Slice/ProductsSlice';


const columns = [

  { field: "id", headerName: "ID", flex: 0.5 },
  {
    field: "title",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "price",
    headerName: "Price $",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "rating",
    headerName: "Rating",
    flex: 1,
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
  },
  {
    field: "brand",
    headerName: "Brand",
    flex: 1,
  },


];
const ProductGrid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();


  
  const dispatch = useAppDispatch();
  const  {products, status} = useAppSelector(state=>state.products)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])
  


  function navigateToProduct (id:string):void{
    navigate(`/product/${id}`)
     } 

  return (
    <Box m="20px">
      <Header
        title="PRODUCTS"
        subtitle="Grid of Products for Managment"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {status !=='loading' ?
          <DataGrid
            rows={products}
            columns={columns}
         
           
            disableMultipleRowSelection = {true}
            components={{ Toolbar: GridToolbar }}
          
            onRowClick={(row)=>navigateToProduct(row.row.id)}
          /> :
          <ProgressCircle />
        }
      </Box>
    </Box>
  );
};

export default ProductGrid;
