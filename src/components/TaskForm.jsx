import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//Componente de formulario
export default function TaskForm() {
    const [task, setTask] = useState({
        titulo: '',
        descripccion: ''
    });

    //Hook State para el loading
    const [loading, setLoading] = useState(false)

    //Hook State para el editar
    const [editing, setEditing] = useState(false)

    //Obtener la navegacion para redireccionar
    const navigate = useNavigate()

    //Obtener los parametros
    const params = useParams();

    //Funcion para enviar la peticion
    const handleSumit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (editing === true) {
            await fetch(`${import.meta.env.VITE_API_URL}/api/tareas/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)//enviar los datos como json en el body de la peticion post
            });
        } else {
            //Realizar la peticion
            await fetch(`${import.meta.env.VITE_API_URL}/api/tareas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)//enviar los datos como json en el body de la peticion post
            })
        }
        setLoading(false)

        //Redireccionar al home despues de regitrar la tarea
        navigate('/')
    };

    //Funcion para manejar los cambios
    const handleChange = e =>
        setTask({
            ...task, [e.target.name]: e.target.value
        })

    const loadTask = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tareas/${id}`);
        const data = await res.json();
        setTask({ titulo: data[0].titulo, descripccion: data[0].descripccion });
        setEditing(true);
    }

    useEffect(() => {
        if (params.id) {
            loadTask(params.id);
        }
    }, [params.id])

    return (
        // es el original
        <Grid container direction='column' alignItems='center' justifyContent='center' >
            <Grid item xs={6}>
                <Card sx={{ mt: 5 }} style={{  borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)' }} padding='1rem'>
                    <Typography variant='9' textAlign='center' color='black' fontWeight='bold' >{editing ? 'Editar Tarea' : 'Nueva Tarea'}</Typography>
                    <CardContent >
                        <form onSubmit={handleSumit}>

                            {/* Input para el titulo */}
                            <TextField
                                fullWidth
                                variant='filled'
                                label='TITULO'
                                value={task.titulo}
                                sx={{
                                    display: 'block',
                                    mb: 2,
                                    margin: '.5rem 0',
                                    // '& .MuiInputBase-input': {
                                    //     color: 'white'
                                    // },
                                }}
                                InputLabelProps={{
                                    style: { color: 'black', fontWeight: 'bold' }
                                }}
                                InputProps={{
                                    style: { color: 'black' }
                                }}
                                name='titulo'
                                onChange={handleChange}
                            />

                            {/* Input para la descripcion */}
                            <TextField
                                fullWidth
                                variant='filled'
                                label='DESCRIPCION'
                                value={task.descripccion}
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block', mb: 2, margin: '.5rem 0',
                                    // '& .MuiInputBase-input': {
                                    //     color: 'white'
                                    // }
                                }}
                                InputLabelProps={{
                                    style: { color: 'black', fontWeight: 'bold' }
                                }}
                                InputProps={{
                                    style: { color: 'black' }
                                }}
                                name='descripccion'
                                onChange={handleChange}
                            />

                            <Button variant='contained' color='primary' type='submit'
                                disabled={!(task.titulo.trim() && task.descripccion.trim())}>
                                {loading ? (
                                    <CircularProgress color='inherit' size={20} />
                                ) : (
                                    editing ? 'Editar' : 'Registrar'
                                )}
                            </Button>

                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}


