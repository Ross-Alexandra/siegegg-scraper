import './App.css';
import { Book } from './components/book';
import { CompetitionView } from './views/competitions';
import { MatchesView } from './views/matches';
import { TeamsView } from './views/teams';

function App() {
    return (
        <div className="App">
            <Book>
                <CompetitionView pageTitle='Competitions' />
                <TeamsView pageTitle='Teams' />
                <MatchesView pageTitle='Matches' />
            </Book>
        </div>
    );
}

export default App;
