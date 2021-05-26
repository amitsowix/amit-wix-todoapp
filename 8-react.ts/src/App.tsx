import { FC } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import './index.css';
import {Classes} from 'jss';
import {createUseStyles} from 'react-jss'


const App: FC = () => {
  const classes: Classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <Header/>
      <TodoList/>
      <Footer/> 
    </div>
  );
}


const useStyles : () => Classes = createUseStyles({
  appContainer: {
      height: "100%"
  }
});


export default App;
