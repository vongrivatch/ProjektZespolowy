import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getAuth } from 'firebase/auth';
import { collection, query, where, doc, getDoc, getDocs, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from './services/firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './components/CustomToolbar';
import TaskModal from './components/TaskModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import { useLocation } from 'react-router-dom';
import './CalendarPage.css';

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const auth = getAuth();
  const [events, setEvents] = useState([]);
  const [familyId, setFamilyId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (auth.currentUser) {
      fetchFamilyId();
    }
  }, [auth.currentUser]);

  useEffect(() => {
    if (location.state?.key) {
      setView('month');
      setSelectedDate(new Date());
    }
  }, [location.state]);

  const fetchFamilyId = async () => {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists() && userDoc.data().familyId) {
      setFamilyId(userDoc.data().familyId);
      fetchTasks(userDoc.data().familyId);
    }
  };

  const fetchTasks = async (familyId) => {
    const tasksRef = collection(db, "Tasks");
    const q = query(tasksRef, where("familyId", "==", familyId));
    const querySnapshot = await getDocs(q);
    const tasksData = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const start = data.start instanceof Timestamp ? data.start.toDate() : data.start;
      const end = data.end instanceof Timestamp ? data.end.toDate() : data.end;
      return {
        ...data,
        id: doc.id,
        start,
        end,
      };
    });
    setEvents(tasksData);
  };

  const handleSelectSlot = (slotInfo) => {
    if (view === 'day') {
      setSelectedTask({
        title: '',
        start: slotInfo.start,
        end: slotInfo.start,
        description: '',
        status: 'To do'
      });
      setModalOpen(true);
    } else {
      setSelectedDate(slotInfo.start);
      setView('day');
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedTask(event);
    setDetailsModalOpen(true);
  };

  const handleSubmit = async (task) => {
    const { title, start, end, description, status, familyId } = task;
    const newEvent = {
      title,
      start: Timestamp.fromDate(new Date(start)),
      end: Timestamp.fromDate(new Date(end)),
      description,
      status,
      familyId
    };
    const docRef = await addDoc(collection(db, "Tasks"), newEvent);
    fetchTasks(familyId);
    setModalOpen(false);
  };

  const handleUpdate = async (taskId, updatedFields) => {
    const taskRef = doc(db, "Tasks", taskId);
    await updateDoc(taskRef, updatedFields);
    fetchTasks(familyId);
    setDetailsModalOpen(false);
  };

  return (
    <div className="tasks-page">
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        components={{
          toolbar: props => (
            <CustomToolbar
              {...props}
              onNavigate={(navigate) => {
                if (navigate === 'PREVIOUS') {
                  setSelectedDate(moment(selectedDate).subtract(1, view).toDate());
                } else if (navigate === 'NEXT') {
                  setSelectedDate(moment(selectedDate).add(1, view).toDate());
                }
              }}
            />
          )
        }}
        views={['month', 'week', 'day']}
        view={view}
        date={selectedDate}
      />
      {modalOpen && <TaskModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        familyId={familyId}
      />}
      {detailsModalOpen && <TaskDetailsModal
        isOpen={detailsModalOpen}
        onRequestClose={() => setDetailsModalOpen(false)}
        task={selectedTask}
        onUpdate={handleUpdate}
      />}
    </div>
  );
}

export default CalendarPage;
