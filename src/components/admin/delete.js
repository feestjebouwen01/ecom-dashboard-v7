import React from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
// MUI v5 imports
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Delete() {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.delete('blog/admin/delete/' + id)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
            .then(function () {
                navigate('/admin/');
                window.location.reload();
            });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                m={1}
                p={1}
                bgcolor="background.paper"
            >
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Press here to confirm delete
                </Button>
            </Box>
        </Container>
    );
}
