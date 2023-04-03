import React, { useState } from "react";
import IProduct from "../../types/Product";
import { Box, ClickAwayListener, IconButton, InputBase, List, ListItem, Paper, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { tokens } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../hooks/useHook";
import { fetchProductByName } from "../../store/Slice/ProductsSlice";
import { it } from "node:test";




function SearchResults() {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleClickItem = (value: number) => [
    navigate(`product/${value}`)
  ]
  const handleInputClick = () => {
    setOpen(!open);
  }

  const handleClickAway = () => {
    setOpen(false);
  };
  const { searchProducts } = useAppSelector(state => state.products)

  const dispatch = useAppDispatch();
  const handleChange = (name: S) => {
    setName(name)
    dispatch(fetchProductByName(name))
  }

  return (


    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <InputBase sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          value={name}
          onClick={handleInputClick}
          onChange={(e) => handleChange(e.target.value)}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
        {
          open && (
            <Paper sx={{ borderRadius: '15px', padding: '10px', width: '200%', position: 'absolute', top: '60px', maxHeight: '50vh', overflowY: 'scroll' }} >
              <List>

                {
                  searchProducts?.length > 1 ?
                    searchProducts.map(item => {
                      return (
                        <ListItem key={item.id}>
                          <Link to={`product/${item.id}`}>

                            <Typography variant="h6" color={colors.grey[100]}>
                              {item.title}
                            </Typography>
                          </Link>

                        </ListItem>
                      )
                    })
                    : (
                      <ListItem>
                        <Typography variant="h6" color={colors.grey[100]}>
                          No Results...
                        </Typography>
                      </ListItem>
                    )
                }
              </List>

            </Paper>
          )
        }

      </Box>
    </ClickAwayListener>


  );
}

export default SearchResults;
