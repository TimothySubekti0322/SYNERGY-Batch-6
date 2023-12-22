import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const About = () => {
    const top100Films = [
        'The Shawshank Redemption',
        'The Godfather',
        'The Godfather: Part II',
    ];
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
        />
    )
}

export default About