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
  const [ordenation, setOrdenation] = useState('asc');
  const { currentUser } = useAuth();

  useEffect(() => {
    const queryResponse = async () => {
      if (!currentUser) return;

      const tasksCollectionRef = collection(db, 'users', `${currentUser?.uid}`, 'tasks');

      const tasksQuery = query(
        tasksCollectionRef,
        orderBy('title', `${ordenation}`),
        limit(30),
      );

      const response = await getDocs(tasksQuery);

      setTasks(response.docs);
      setLoading(false);
    };

    queryResponse();
  }, [loading, ordenation]);

  const handleOpenEditModal = useCallback((event, taskInfos) => {
    event.preventDefault();
    document.querySelector('body').setAttribute('id', 'layer');

    setShowModal('edit');

    setTaskDetailedInfo(taskInfos);
  }, []);

  async function handleDeleteTask(event, taskId) {
    event.preventDefault();
    setLoading(true);
    const taskDocumentRef = doc(db, 'users', `${currentUser?.uid}`, 'tasks', `${taskId}`);

    await deleteDoc(taskDocumentRef);

    setLoading(false);
  }

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

  function handleChangeInfos() {
    setLoading(true);
  }

  function onChangeOrderBy(newOrder) {
    console.log(newOrder);
    setOrdenation(newOrder);
  }

  return (
    <>
      <Header page="/" />
      <Container>
        {tasks?.length > 0 && <TasksFilter onChangeOrderBy={onChangeOrderBy} />}
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
                handleCloseModal={handleCloseModal}
                taskInfos={taskDetailedInfo}
                onChangeInfos={handleChangeInfos}
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
