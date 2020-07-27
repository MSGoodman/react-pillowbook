import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.css';
import './App.css';
import CreatePage from './components/pages/create/CreatePage/CreatePage';
import Header from './components/Header/Header';
import SchedulePage from './components/pages/schedule/SchedulePage/SchedulePage';
import TaskPage from './components/pages/tasks/TaskPage/TaskPage';
import ReviewPage from './components/pages/review/ReviewPage/ReviewPage';

// Mock Data
import GenericPage from './components/GenericPage/GenericPage';

function App() {
  const [status, setStatus] = useState('test');

  useEffect(() => {
    fetch("http://localhost:9000/status")
      .then(res => res.text())
      .then(text => setStatus(text))
  }, []);

  return (
    <div className="App">
      {status}
      <Header></Header>
      <Tabs>
        <TabList>
          <Tab>Create</Tab>
          <Tab>Schedule</Tab>
          <Tab>Tasks</Tab>
          <Tab>Review</Tab>
          <Tab>Generic: Lover</Tab>
          <Tab>Generic: Horizon</Tab>
        </TabList>

        <TabPanel> <CreatePage></CreatePage> </TabPanel>
        <TabPanel> <SchedulePage></SchedulePage> </TabPanel>
        <TabPanel> <TaskPage></TaskPage> </TabPanel>
        <TabPanel> <ReviewPage></ReviewPage> </TabPanel>
        <TabPanel> <GenericPage node_uuid='Lover'></GenericPage></TabPanel>
        <TabPanel> <GenericPage node_uuid='HorizonZeroDawn'></GenericPage></TabPanel>

      </Tabs>
    </div>
  );
}

export default App;
