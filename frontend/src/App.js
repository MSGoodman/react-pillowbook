import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './tabs.css';
import './App.css';
import CreatePage from './components/pages/create/CreatePage/CreatePage';
import Header from './components/Header/Header';
import SchedulePage from './components/pages/schedule/SchedulePage/SchedulePage';
import TaskPage from './components/pages/tasks/TaskPage/TaskPage';
import ReviewPage from './components/pages/review/ReviewPage/ReviewPage';
import ArtPage from './components/pages/art/ArtPage/ArtPage';

// Mock Data
import horizonReviewMock from './mock/art-horizon/reviews.json';
import horizonRelationMock from './mock/art-horizon/relations.json';
import horizonSessionMock from './mock/art-horizon/sessions.json';
import horizonItemMock from './mock/art-horizon/main.json';

import synecdocheReviewMock from './mock/art-synecdoche/reviews.json';
import synecdocheRelationMock from './mock/art-synecdoche/relations.json';
import synecdocheSessionMock from './mock/art-synecdoche/sessions.json';
import synecdocheItemMock from './mock/art-synecdoche/main.json';
import FoodPage from './components/pages/food/FoodPage/FoodPage';

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
          <Tab>{horizonItemMock.name}</Tab>
          <Tab>{synecdocheItemMock.name}</Tab>
          <Tab>Dinner</Tab>
        </TabList>

        <TabPanel> <CreatePage></CreatePage> </TabPanel>
        <TabPanel> <SchedulePage></SchedulePage> </TabPanel>
        <TabPanel> <TaskPage></TaskPage> </TabPanel>
        <TabPanel> <ReviewPage></ReviewPage> </TabPanel>
        <TabPanel>
          <ArtPage item={horizonItemMock} reviews={horizonReviewMock} sessions={horizonSessionMock} relations={horizonRelationMock}></ArtPage>
        </TabPanel>
        <TabPanel>
          <ArtPage item={synecdocheItemMock} reviews={synecdocheReviewMock} sessions={synecdocheSessionMock} relations={synecdocheRelationMock}></ArtPage>
        </TabPanel>
        <TabPanel> <FoodPage></FoodPage></TabPanel>

      </Tabs>
    </div>
  );
}

export default App;
