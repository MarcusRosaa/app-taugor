import {
  collection, deleteDoc, doc, getDocs, limit, orderBy, query,
} from 'firebase/firestore';
import {
  useEffect, useState,
  useCallback,
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
  CardTitle, Priority, ProgressStatus, CardBottom,
} from './styles';

import NoTasks from '../../components/NoTasks';
import TaskModalInfos from '../../components/TaskModalInfos';
import TaskModalEdit from '../../components/TaskModalEdit';

export default function Dashboard() {
  const [tasks, setTasks] = useState(null);
  const [taskDetailedInfo, setTaskDetailedInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const queryResponse = async () => {
      if (!currentUser) return;

      // referencia apontando para a coleçao de tasks do usuario
      const tasksCollectionRef = collection(db, 'users', `${currentUser?.uid}`, 'tasks');
      // busca querys(tasks) da coleçao referenciada acima
      const tasksQuery = query(tasksCollectionRef, orderBy('task_description', 'asc'), limit(30));
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
  }, [loading]);

  async function handleDeleteTask(event, taskId) {
    event.preventDefault();
    setLoading(true);
    const taskDocumentRef = doc(db, 'users', `${currentUser?.uid}`, 'tasks', `${taskId}`);

    await deleteDoc(taskDocumentRef);

    setLoading(false);
  }

  const handleOpenEditModal = useCallback((event, taskInfos) => {
    event.preventDefault();
    document.querySelector('body').setAttribute('id', 'layer');

    setShowModal('edit');

    setTaskDetailedInfo(taskInfos);
  }, []);

  const handleOpenInfosModal = useCallback((event, task) => {
    event.preventDefault();

    setShowModal('infos');

    setTaskDetailedInfo({ ...task.data() });

    document.querySelector('body').setAttribute('id', 'layer');
  }, []);

  function handleCloseModal(event) {
    if (event.target.classList.contains('modalLayer')) {
      document.querySelector('body').removeAttribute('id');
      setShowModal(null);
    }
  }

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
                    <button
                      type="button"
                      onClick={(event) => handleDeleteTask(event, task.data().id)}
                    >
                      <DeleteIcon className="card_icon__delete" />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => handleOpenEditModal(event, task.data())}
                    >
                      <EditIcon className="card_icon__edit" />
                    </button>
                  </CardHeader>

                  <CardTitle>{task.data().title}</CardTitle>

                  {/* descriçao do problema */}
                  {task.data().task_description
                  && (
                  <p className="card_problem_description">{task.data().task_description}</p>
                  )}

                  <CardBottom>
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

                    <button type="button" onClick={(event) => handleOpenInfosModal(event, task)}>
                      Mais detalhes
                    </button>
                  </CardBottom>
                </Card>
              ))}

              {/* modal de detalhes do card */}
              {showModal && showModal === 'infos'
              && (
              <TaskModalInfos
                closeModal={handleCloseModal}
                taskInfos={taskDetailedInfo}
              />
              )}

              {showModal && showModal === 'edit'
              && (
              <TaskModalEdit
                closeModal={handleCloseModal}
                taskInfos={taskDetailedInfo}
              />
              )}
            </TasksContainer>
          )
        }
        { !loading && tasks?.length === 0 && <NoTasks /> }
      </Container>
    </>
  );
}
