import React, { Component }from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyContext = React.createContext();

class MyProvider extends Component {
    state = {
        stage: 1,
        players: [],
        result:''
    }

    addPlayerHandler = (name) => {
        this.setState((prevState)=> ({
             players: [ 
                 ...prevState.players,
                 name
             ]
        }))
    }

    removePlayerHandler = (index) => {
        let newArray = this.state.players;
        newArray.splice(index,1);
        this.setState({
            players: newArray
        })
    }

    generateLoser = () => {
        let newArray = this.state.players;
        let randomNumber = Math.floor(Math.random() * newArray.length);
        let loser = newArray[randomNumber]
        this.setState({
            result: loser
        })

    }



    nextHandler = () => {
        const { players } = this.state;

        if(players.length < 2 ){
            toast.error("You need more than one player",{
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000
            })
        } else {
            this.setState({
                stage: 2
            },()=> {
                setTimeout(()=>{
                    this.generateLoser()
                },2000)
            })
        }
    }

    resetHandler = () => {
        this.setState({
            stage: 1,
            players: [],
            result:''
        })
    }

    render(){
        return(
            <>
                <MyContext.Provider value={{
                    state:this.state,
                    addPlayer:this.addPlayerHandler,
                    removePlayer: this.removePlayerHandler,
                    next: this.nextHandler,
                    generateLoser: this.generateLoser,
                    reset: this.resetHandler

                }}>
                    {this.props.children}
                </MyContext.Provider>
                <ToastContainer />
            </>
        )
    }

}

export { MyContext, MyProvider}