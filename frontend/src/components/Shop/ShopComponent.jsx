import React, { useEffect } from 'react'
import plantActions from '../../redux/actions/plantActions'
import { connect } from 'react-redux';
import { Link as LinkRouter } from "react-router-dom"
import './shop.css'
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import cartActions from '../../redux/actions/cartActions.js'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Grid } from '@mui/material';
import Slider from '@mui/material/Slider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightModeIcon from '@mui/icons-material/LightMode';
import WaterIcon from '@mui/icons-material/Water';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Swal from 'sweetalert2'

const careMarks = [
  {
    value: 0,
    label: 'Unkillable',
  },
  {
    value: 50,
    label: 'No Fuss',
  },
  {
    value: 100,
    label: 'Extra Love',
  },
];

const lightMarks = [
  {
    value: 0,
    label: 'Low',
  },
  {
    value: 50,
    label: 'Indirect',
  },
  {
    value: 100,
    label: 'Bright',
  },
];

const WaterMarks = [
  {
    value: 0,
    label: 'Desert style',
  },
  {
    value: 50,
    label: 'Medium',
  },
  {
    value: 100,
    label: 'Water addicted',
  },
];

function ShopComponent(props) {

  const alertsToasts = (icon, message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: `${icon}`,
      title: `${message}`
    })
  }

  const { allPlants: plants, loaded, filter } = props

  const { fetchPlants, addToCart, filterPlants } = props

  const handleSizeFilter = event => {
    const size = new Set(filter.size);
    size[event.target.checked ? 'add' : 'delete'](event.target.value);
    filterPlants({
      ...filter,
      size
    })
  }

  const handleRoomFilter = event => {
    const room = new Set(filter.room);
    room[event.target.checked ? 'add' : 'delete'](event.target.value);
    filterPlants({
      ...filter,
      room
    })
  }

  useEffect(() => {
    !loaded && fetchPlants();
  }, [])

  return (
    <div className="wrapperShop">
      <Accordion
        sx={{ width: '100%', top: '-48px', position: 'absolute', zIndex: 2000 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columns={{ md: 12 }}>
            <Grid item md={4}>
              <List dense={false}>
                <ListItem>
                  <ListItemIcon>
                    <FavoriteIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Care"
                    secondary={
                      <Slider
                        color="error"
                        marks={careMarks}
                        sx={{ width: 200 }}
                        value={filter.careRatio}
                        valueLabelDisplay="auto"
                        valueLabelFormat={value => value + '%'}
                        onChange={event => {
                          filterPlants({
                            ...filter,
                            careRatio: event.target.value
                          })
                        }}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LightModeIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Light"
                    secondary={
                      <Slider
                        color="warning"
                        marks={lightMarks}
                        sx={{ width: 200 }}
                        value={filter.lightRatio}
                        valueLabelDisplay="auto"
                        valueLabelFormat={value => value + '%'}
                        onChange={event => {
                          filterPlants({
                            ...filter,
                            lightRatio: event.target.value
                          })
                        }}
                      />
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WaterIcon color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Water"
                    secondary={
                      <Slider
                        color="info"
                        marks={WaterMarks}
                        sx={{ width: 200 }}
                        value={filter.waterRatio}
                        valueLabelDisplay="auto"
                        valueLabelFormat={value => value + '%'}
                        onChange={event => {
                          filterPlants({
                            ...filter,
                            waterRatio: event.target.value
                          })
                        }}
                      />
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item md={4}>
              <Typography>Room</Typography>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel control={<Checkbox checked={filter.room.has('office')} value="office" onChange={handleRoomFilter} />} label="Office" />
                <FormControlLabel control={<Checkbox checked={filter.room.has('kitchen')} value="kitchen" onChange={handleRoomFilter} />} label="Kitchen" />
                <FormControlLabel control={<Checkbox checked={filter.room.has('bathroom')} value="bathroom" onChange={handleRoomFilter} />} label="Bathroom" />
                <FormControlLabel control={<Checkbox checked={filter.room.has('living room')} value="living room" onChange={handleRoomFilter} />} label="Living Room" />
                <FormControlLabel control={<Checkbox checked={filter.room.has('bedroom')} value="bedroom" onChange={handleRoomFilter} />} label="Bedroom" />
                <FormControlLabel control={<Checkbox checked={filter.room.has('garden')} value="garden" onChange={handleRoomFilter} />} label="Garden" />
              </div>
            </Grid>
            <Grid item md={4}>
              <Typography>Size</Typography>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel control={<Checkbox checked={filter.size.has('small')} value="small" onChange={handleSizeFilter} />} label="Small" />
                <FormControlLabel control={<Checkbox checked={filter.size.has('medium')} value="medium" onChange={handleSizeFilter} />} label="Medium" />
                <FormControlLabel control={<Checkbox checked={filter.size.has('large')} value="large" onChange={handleSizeFilter} />} label="Large" />
              </div>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <FormGroup>
                <Typography>Price</Typography>
                <div style={{ display: 'flex', gap: '0px 8px' }}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="min-price">Min. price</InputLabel>
                    <Input
                      id="min-price"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={filter.minPrice}
                      onChange={event => filterPlants({
                        ...filter,
                        minPrice: event.target.value
                      })}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="max-price">Max. price</InputLabel>
                    <Input
                      id="max-price"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={filter.maxPrice}
                      onChange={event => filterPlants({
                        ...filter,
                        maxPrice: event.target.value
                      })}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormControl>
                </div>
              </FormGroup>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <div className="wrapperMediumSize">
        {plants.length === 0 ? (<h1>No plants found</h1>) : plants.map((item) => {
          return (
            <div className="cardWrapper">
              <img className="imgCard" src={process.env.PUBLIC_URL + `/img/plants/${item.images}`} alt="" />
              <div className="cardTextContent">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <Button variant="text">
                  <LinkRouter className="linkCard" to={`/Details/${item._id}`}>DETAILS</LinkRouter>
                </Button>
                <Button size="small" onClick={() => { addToCart(item); alertsToasts('success', 'Plant succesfully added to your cart') }} variant="contained"><AddShoppingCartIcon /></Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    allPlants: state.plantReducer.allPlants,
    plants: state.plantReducer.plants,
    plant: state.plantReducer.plant,
    loaded: state.plantReducer.loaded,
    filter: state.plantReducer.filter
  }
}

const mapDispatchToProps = {
  fetchPlants: plantActions.fetchPlants,
  addToCart: cartActions.addToCart,
  filterPlants: plantActions.filterPlants
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopComponent)

