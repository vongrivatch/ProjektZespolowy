import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getAuth } from 'firebase/auth';
import { collection, query, where, doc, getDoc, getDocs, addDoc } from 'firebase/firestore';
import { db } from './services/firebase';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TasksPage() {
  const auth = getAuth();
  const [events, setEvents] = useState([]);
  const [familyId, setFamilyId] = useState('');

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
    const tasksData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      start: doc.data().start.toDate(),
      end: doc.data().end.toDate(),
    }));
    setEvents(tasksData);
  };

  const handleSelectSlot = async ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = { start, end, title, familyId };
      const docRef = await addDoc(collection(db, "Tasks"), newEvent);
      setEvents([...events, { ...newEvent, id: docRef.id }]);
    }
  };

  return (
    <div className="tasks-page">
      <h1>Task Scheduler</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
}

export default TasksPage;
