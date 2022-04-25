import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './grid.css';
import { Typography } from '@mui/material';

export default function StandardImageList() {
    return (
        <>
            <Typography variant="h4" sx={{ padding: '10px', marginTop: '25px' }}>Design by nature</Typography>
            <div className="container">
                <ImageList sx={{
                    width: 1200,
                    // height: 550,
                    gap: 5,
                    margin: 2,
                    display: 'grid'
                }} cols={3} rowHeight={250}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} sx={{ overflow: 'hidden', borderRadius: 1 }}>
                            <img
                                style={{
                                    objectFit: 'cover',
                                }}
                                src={item.img}
                                srcSet={item.img}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </>
    );
}

const itemData = [
    {
        img: 'https://lushplants.herokuapp.com/assets/plant-decor12.jpeg',
        title: 'Breakfast',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant.decoM14.webp',
        title: 'Burger',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant.decoM13.jpeg',
        title: 'Camera',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant_deco2.png',
        title: 'Coffee',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant-decor03.jpg',
        title: 'Hats',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/deco03.jpeg',
        title: 'Honey',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant-decor08.jpeg',
        title: 'Basketball',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant-decor06.jpeg',
        title: 'Fern',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant-decor12.jpeg',
        title: 'Mushrooms',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant_deco9.webp',
        title: 'Mushrooms',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant-decor07.jpeg',
        title: 'Mushrooms',
    },
    {
        img: 'https://lushplants.herokuapp.com/assets/plant-decor04.jpeg',
        title: 'Mushrooms',
    },







];

