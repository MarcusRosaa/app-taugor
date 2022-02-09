import {
  collection, getDocs, limit, orderBy, query,
} from 'firebase/firestore';
import {
  useEffect, useState,
} from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import priorityArrowIcon from '../../assets/images/arrowhead-up.png';

import priorityNormalIcon from '../../assets/images/equal.png';

import Header from '../../components/Header';
import TasksFilter from '../../components/TasksFilter';
import { db } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';

import {
  Card, Container, TasksContainer, CardHeader,
  CardTitle, Priority, ProgressStatus,
} from './styles';

import NoTasks from '../../components/NoTasks';

export default function Dashboard() {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const queryResponse = async () => {
      if (!currentUser) return;

      // referencia apontando para a coleçao de tasks do usuario
      const tasksCollectionRef = collection(db, 'users', `${currentUser?.uid}`, 'tasks');
      // busca querys(tasks) da coleçao referenciada acima
      const tasksQuery = query(tasksCollectionRef, orderBy('title', 'asc'), limit(30));
      // funçao assincrona para pegar(GET) as tasks da query
      const response = await getDocs(tasksQuery);

      // const lastVisible = response.docs[response.docs.length - 1];

      // const next = query(collection(db, "cities"),
      // orderBy("population"),
      // startAfter(lastVisible),
      // limit(25));
      setTasks(response.docs);
      setLoading(false);
    };

    queryResponse();
  }, []);

  return (
    <>
      <Header page="/" />
      <Container>
        {tasks?.length > 0 && <TasksFilter />}
        {
          tasks?.length > 0
          && (
            <TasksContainer>
              {tasks.map((task) => (
                <Card key={task.data().id}>
                  <CardHeader>
                    <ProgressStatus progress={task.data().status}>
                      {task.data().status}
                    </ProgressStatus>
                    <DeleteIcon className="card_icon__delete" />
                    <EditIcon className="card_icon__edit" />
                  </CardHeader>
                  <CardTitle>{task.data().title}</CardTitle>

                  {task.data().problem_description
                  && (
                  <p className="card_problem_description">{task.data().problem_description}</p>
                  )}

                  <Priority priority={task.data().priority}>
                    {task.data().priority === 'alta'
                    && (
                      <img src={priorityArrowIcon} alt="" />
                    )}

                    {task.data().priority === 'média'
                    && (
                      <img src={priorityNormalIcon} alt="" />
                    )}

                    {task.data().priority === 'baixa'
                    && (
                      <img src={priorityArrowIcon} alt="" />
                    )}
                  </Priority>
                </Card>
              ))}
            </TasksContainer>
          )
        }
        { !loading && tasks?.length === 0 && <NoTasks /> }

      </Container>
    </>
  );
}
