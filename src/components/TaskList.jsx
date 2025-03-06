import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function TaskList() {

    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const loadTasks = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tareas`);
        const data = await res.json();
        setTasks(data);
    }

    const handleDelete = async (id) => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/tareas/${id}`, {
            method: 'DELETE'
        });
        // loadTasks();

        setTasks(tasks.filter(task => task.id !== id));

    }

    useEffect(() => {
        loadTasks();
    }, [])

    return (
        <>
            <h1>Listado de tareas</h1>
            {
                tasks.map(task => (
                    <Card key={task.id}
                        style={{
                            marginBottom: '20px',
                            backgroundColor: '#f5f5f5'
                        }}>
                        <CardContent
                            style={{
                                display: 'flex',
                                justifyContent: "space-between",
                            }}>
                            <div>
                                <Typography variant="h5" component="div">
                                    {task.titulo}
                                </Typography>
                                <Typography variant="body2">
                                    {task.descripccion}
                                </Typography>
                            </div>

                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ marginTop: '10px' }}
                                    onClick={() => navigate(`/task/edit/${task.id}`)}>
                                    Editar
                                </Button>

                                <Button
                                    variant="contained"
                                    color="warning"
                                    size="small"
                                    style={{ marginTop: '10px', marginLeft: '10px' }}
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}
