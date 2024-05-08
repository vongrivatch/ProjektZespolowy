import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getAuth } from 'firebase/auth';
import { collection, query, where, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from '../components/CustomToolbar';
import TaskModal from '../components/TaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
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

  useEffect(() => {
    if (auth.currentUser) {
      fetchFamilyId();
    }
  }, [auth.currentUser]);

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
    const tasks = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      start: doc.data().start.toDate(),
      end: doc.data().end.toDate(),
      id: doc.id,
      status: doc.data().status
    }));
    setEvents(tasks);
  };

  const eventStyleGetter = (event) => {
    const statusColor = {
      'To do': '#3174ad',
      'In progress': '#f0ad4e',
      'Done': '#5cb85c',
      'Declined': '#d9534f'
    };
    return {
      style: {
        backgroundColor: statusColor[event.status] || '#3174ad'
      }
    };
  };

  const handleSelectSlot = (slotInfo) => {
    if (view === 'day') {
      const newTaskStart = new Date(slotInfo.start);
      newTaskStart.setHours(0, 0, 0, 0);
      setSelectedTask({ start: newTaskStart });
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
        eventPropGetter={eventStyleGetter}
        components={{ toolbar: CustomToolbar }}
        views={['month', 'week', 'day']}
        view={view}
        date={selectedDate}
        onView={setView}
        onNavigate={setSelectedDate}
      />
      {modalOpen && (
        <TaskModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          onSubmit={() => {}}
          familyId={familyId}
          selectedTask={selectedTask}
        />
      )}
      {detailsModalOpen && (
        <TaskDetailsModal
          isOpen={detailsModalOpen}
          onRequestClose={() => setDetailsModalOpen(false)}
          task={selectedTask}
          onUpdate={() => {}}
        />
      )}
    </div>
  );
}

export default CalendarPage;
