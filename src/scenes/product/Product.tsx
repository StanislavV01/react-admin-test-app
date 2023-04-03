import{Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Paper, Typography} from '@mui/material'
import Header from '../../components/Header/Header'
import InfoRow from './InfoRow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressCircle from '../../components/ProgressCircle';
import { useEffect, useState } from 'react';
import IProduct from '../../types/Product';
import { useAppDispatch } from '../../hooks/useHook';
import { deleteProduct } from '../../store/Slice/ProductsSlice';


function Product() {
  const {productId} =useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState<string>('idle')
  const dispatch = useAppDispatch();

  useEffect(()=>{
    setStatus('loading')
    fetch(`https://dummyjson.com/products/${productId}`)
.then(res => res.json())
.then((data)=>setProduct(data))
.catch(()=>setStatus('error'))
setStatus('idle')
// console.log(product.images[0])
  },[productId])


  const deleteHandler = (id:string):void=>{
    dispatch(deleteProduct(id))
    navigate('/productgrid')
  }

  
  if(status=='loading'){
    return<Box display={'flex'} justifyContent={'center'}>
      <ProgressCircle/>
    </Box>
  }
  if(status=='error'){
    return(
      <Box display={'flex'} justifyContent={'center'}>
<p>Error</p>  
    </Box>
    )
  }

if(product){

 return <Box padding={'10px 30px'}>
    <Header title={product.title} subtitle={product.category}/>
    
    <Grid
        container
        spacing={{ xs: 1, md: 7 }}
        columns={{ xs: 6, sm: 6, md: 12 }}
      >
     <Grid item xs={12} sm={12} md={6} lg={6}>
   
      <img src={product?.images[0]} alt={product.title}  />

     </Grid>
     <Grid item xs={12} sm={12} md={6} lg={6} >
       <Paper sx={{padding:'10px 15px', borderRadius:'25px  '}}>
       <InfoRow char='ID' value={product.id}/>
        <InfoRow char='Title' value={product.title}/>
        <InfoRow char='stock' value={product.stock}/>
        <InfoRow char='Price' value={`${product.price}$`}/>
        <InfoRow char='brand' value={product.brand}/>
        <InfoRow char='Category' value={product.category}/>
        <InfoRow char='Rating' value={product.rating}/>
      
        <InfoRow char='Discount' value={`${product.discountPercentage}%`}/>

       </Paper>
       <Accordion sx={{margin:'10px auto'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {product.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Button color="secondary" variant="contained"
      onClick={()=>deleteHandler(product.id)}
      >
                Delete Product
              </Button>
              <Button color="secondary"
     variant="contained"
      onClick={()=>navigate('/productgrid')}
      sx={{margin:'20px'}}
      >
             Back
              </Button>
     </Grid>
     </Grid>
  </Box>
  
}  
}

export default Product;
