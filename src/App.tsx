import React from 'react';
import {StopWatch} from "./components/StopWatch";
import {Timer} from "./components/Timer";

function App() {
  return (
    <main className='flex border w-fit'>
        <StopWatch />
        <Timer />
    </main>
  );
}

export default App;
