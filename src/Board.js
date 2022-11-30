import React from 'react';
import './Board.css'
import Cell from './Cell';

class Board extends  React.Component {

    static defaultProps = { nrows : 5, ncols : 5, chanceLightStartsOn: 0.25 }

    constructor(props){
     super(props)
     this.state = {
        board : this.createBoard(),
        hasWon : false,
     }
    }

    createBoard = () => {
        let board = [];
        // TODO: create array-of-arrays of true/false values
        for (let y = 0; y < this.props.nrows; y++) {
          let row = [];
          for (let x = 0; x < this.props.ncols; x++) {
            row.push(Math.random() < this.props.chanceLightStartsOn);
            console.log(Math.random())
          }
          board.push(row);
        }
        return board;
      }

      makeTable = () =>{
         let tblBoard = []
         for ( let r = 0 ; r < this.props.nrows; r++)
         {
            let row = []
            for( let c = 0; c < this.props.ncols; c++){
                let coord = `${r}-${c}`;
                  row.push(
                    <Cell
                    key={coord}
                    isLit={this.state.board[r][c]}
                    flipLights = {()=>this.flipLights(coord)}
                    ></Cell>
                  )
            }
            tblBoard.push(<tr key={r}>{row}</tr>);
         }
         return (
            <table className='Board'>
            <tbody>{tblBoard}</tbody>
          </table>
         )
      }


      flipLights = (cords) =>{
        let { ncols, nrows } = this.props;
        let [r,c] = cords.split("-").map(v => Number(v));
        let board = this.state.board;
      function  flip (r,c){
            if((r >= 0 && r < nrows) && (c >= 0 && c < nrows)){
                    board[r][c] = !board[r][c];
            }
        }

        flip(r,c);
        flip(r+1,c);
        flip(r-1,c);
        flip(r,c+1);
        flip(r,c-1);

        let hasWon = board.every((v)=> v.every((v)=>v==false))
        this.setState({
            board: board,
            hasWon:hasWon
        })
      }

    render(){
        // this.flipLights("2-3")
        console.log(this.state.board );
        return (

            this.state.hasWon?
            (<div className='winner'>
              <span className='neon-blue'>You</span>
              <span className='neon-orange'>Win!</span>
            </div>)
            :(<div >
                <div className='Board-title'>
                    <div className='neon-orange'>lights</div>
                    <div className='neon-blue'>out</div>
                </div>
                {this.makeTable()}
            </div>)
        )
    }
}
export default Board;