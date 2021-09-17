import React, { useContext } from 'react'


import { MyContext } from '../context'

const Stage2 = () =>{

    const context = useContext(MyContext);

    return(
        <>
            <div className="result_wrapper">
                <h3>The looser is:</h3>
                <div>{context.state.result}</div>
            </div>
            <div className="action_button" onClick={()=>{context.reset()}}>
                START OVER
            </div>
            <div className="action_button btn_2" onClick={()=>{setTimeout(()=>{
                    context.generateLoser()
                },2000)}}>
                GET A NEW LOOSER
            </div>
        </>
    )
}

export default Stage2;