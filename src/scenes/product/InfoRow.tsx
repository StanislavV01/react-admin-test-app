import { Box, Typography } from "@mui/material";
import React from "react";
 
interface IInfoRowProps{
    char:string,
    value: string | number | null
}
function InfoRow({char, value}:IInfoRowProps) {
  return <Box display={'flex'} justifyContent={'space-between'} alignItems='center' margin={'10px auto'}>
    <Typography variant="h3" >{char} :</Typography>
    
    <Typography variant="h5" >{value}</Typography>
  </Box>;
}

export default InfoRow;
