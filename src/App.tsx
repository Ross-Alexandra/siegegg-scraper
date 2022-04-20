import './App.css';
import { useApiData } from './hooks';
import { useCallback } from 'react';

function App() {
    const getTest = useCallback(async () => {
        return await window.api.test();
    }, []);
    const [testData, dataStatus] = useApiData(getTest);

    return (
        <div className="App">
            <p>{testData}</p>
        </div>
    );
}

export default App;
