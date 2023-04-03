import { Box, IconButton, useTheme } from "@mui/material";
import { useContext , useState} from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchResults from '../../components/SearchResults/SearchResults'

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
    
    <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'}  position={'relative'}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
       
        borderRadius="3px"
      >
    
        
        < SearchResults />
      
      </Box>
      {/* <SearchResults flex={1}></SearchResults> */}
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
     
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
