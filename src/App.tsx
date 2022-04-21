import './App.css';
import { Book } from './components/Book';
import { CompetitionView } from './views/competitions';

function App() {
    return (
        <div className="App">
            <Book>
                <CompetitionView title='Competitions' />
                <div title='teams' style={{backgroundColor: 'blue', width: '100%', height: '100%'}}></div>
                <div title='matches' style={{backgroundColor: 'green', width: '100%', height: '100%'}}></div>
            </Book>
        </div>
    );
}

export default App;
