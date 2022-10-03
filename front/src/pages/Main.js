import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './Main.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Main () {
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(0);
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        async function loadFacilities () {
            const response = await api.get('/facilities')
            setFacilities(response.data);
        }
        
        loadFacilities();
    }, []);

    
    useEffect(() => {
        async function loadNurses () {
            const response = await api.get(`/clinician-work-history/${selectedFacility}`)
            setNurses(response.data);
        }
        
        loadNurses();
    }, [selectedFacility]);

    return (
        <div className="main-container">
            { facilities.length > 0 ? (
            <ul>
                <select>
                    {facilities.map(facility => (
                        <option value={facility.facility_id} onClick={() => setSelectedFacility(facility.facility_id)}>
                            {facility.facility_name}
                        </option>
                        ))}      
                </select>
            </ul>) : (<div className="empty">No available facilities :(</div>)}

            { selectedFacility && nurses && nurses.length > 0 && (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {nurses?.map((nurse) => {
                        (<Grid item xs={3}>
                            <Item>
                                <Typography variant="h1" component="h2">{nurse.nurse_name}</Typography>
                                <Typography variant="h2" component="h2">{nurse.score}</Typography>
                            </Item>
                        </Grid>)
                    })}
                </Grid>
            </Box>
            )}
        </div>
    )
}