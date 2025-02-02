import '@/App.css';

import { useState } from 'react';

import reactLogo from '@/assets/react.svg';
import { useWindowSize } from '@/hooks/useWindowSize';

import viteLogo from '/vite.svg';

function App() {
    const [count, setCount] = useState(0);
    const size = useWindowSize();

    console.log(size);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;

// const sx1 = {
//     '     MuiButton-root   Mui  ': {
//         color: 'red',
//     },
// };

// const sx = {
//     width: {
//         sx: 100,
//         md: 200,
//     },
// };

// const pre = {};
// const obj = { ...pre };
