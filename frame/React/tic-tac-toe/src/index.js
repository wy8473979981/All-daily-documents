import React from 'react';
import ReactDOM from 'react-dom';
import eventProxy from 'eventproxy';
import './index.css';

function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare (i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick (i)}
      />
    );
  }

  render () {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare (0)}
          {this.renderSquare (1)}
          {this.renderSquare (2)}
        </div>
        <div className="board-row">
          {this.renderSquare (3)}
          {this.renderSquare (4)}
          {this.renderSquare (5)}
        </div>
        <div className="board-row">
          {this.renderSquare (6)}
          {this.renderSquare (7)}
          {this.renderSquare (8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      history: [
        {
          squares: Array (9).fill (null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick (i) {
    const history = this.state.history.slice (0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice ();
    if (calculateWinner (squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState ({
      history: history.concat ([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo (step) {
    this.setState ({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render () {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner (current.squares);

    const moves = history.map ((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo (move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick (i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render (<Game />, document.getElementById ('root'));

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================父组件向子组件通讯
// class Parent extends React.Component {
//   state = {
//     msg: 'start',
//   };

//   componentDidMount () {
//     setTimeout (() => {
//       this.setState ({
//         msg: 'end',
//       });
//     }, 1000);
//   }

//   render () {
//     return <Child_1 msg={this.state.msg} />;
//   }
// }

// class Child_1 extends React.Component {
//   render () {
//     return <p>{this.props.msg}</p>;
//   }
// }
// ReactDOM.render (<Parent />, document.getElementById ('root2'));

// ========================================父组件向子组件的子组件传递数据
// class Parent extends React.Component {
//   state = {
//     msg: 'start',
//   };

//   componentDidMount () {
//     setTimeout (() => {
//       this.setState ({
//         msg: 'end',
//       });
//     }, 1000);
//   }

//   render () {
//     return <Child_1 msg={this.state.msg} />;
//   }
// }

// class Child_1 extends React.Component{
//   render() {
//     return <div>
//       <p>{this.props.msg}</p>
//       <Child_1_1 {...this.props}/>
//     </div>
//   }
// }

// class Child_1_1 extends React.Component{
//   render() {
//     return <p>父组件向子组件的子组件传递数据===>{this.props.msg}</p>
//   }
// }
// ReactDOM.render (<Parent />, document.getElementById ('root2'));

// ========================================子组件向父组件通讯
// class Parent extends React.Component {
//   constructor (props) {
//     super (props);
//     this.state = {
//       msg: 'start',
//     };

//     this.transferMsg = this.transferMsg.bind(this);
//   }

//   transferMsg (msg) {
//     this.setState ({
//       msg,
//     });
//   }

//   render () {
//     return (
//       <div>
//         <p>child msg: {this.state.msg}</p>
//         <Child_1 eventMsg={msg => this.transferMsg (msg)} />
//       </div>
//     );
//   }
// }

// class Child_1 extends React.Component {
//   componentDidMount () {
//     setTimeout (() => {
//       this.props.eventMsg ('end');
//     }, 1000);
//   }

//   render () {
//     return (
//       <div>
//         <p onClick={()=>this.props.eventMsg('子组件向父组件通讯')}>child_1 component</p>
//       </div>
//     );
//   }
// }
// ReactDOM.render (<Parent />, document.getElementById ('root2'));

// ========================================父组件向子组件的子组件传递事件处理函数
// class Parent extends React.Component {
//   constructor (props) {
//     super (props);
//     this.state = {
//       msg: 'start',
//     };

//     this.transferMsg = this.transferMsg.bind(this);
//   }

//   transferMsg (msg) {
//     this.setState ({
//       msg,
//     });
//   }

//   render () {
//     return (
//       <div>
//         <p>child msg: {this.state.msg}</p>
//         <Child_1 msg={this.state.msg} eventMsg={msg => this.transferMsg (msg)} />
//       </div>
//     );
//   }
// }

// class Child_1 extends React.Component {
//   componentDidMount () {
//     setTimeout (() => {
//       this.props.eventMsg ('end');
//     }, 1000);
//   }

//   render () {
//     return (
//       <div>
//         <p onClick={()=>this.props.eventMsg('子组件向父组件通讯')}>child_1 component</p>
//         <Child_1_1 {...this.props}/>
//       </div>
//     );
//   }
// }

// class Child_1_1 extends React.Component{
//   render() {
//     return <p onClick={()=>this.props.eventMsg('父组件向子组件的子组件传递事件处理函数')}>父组件向子组件的子组件传递事件处理函数===>{this.props.msg}</p>
//   }
// }
// ReactDOM.render (<Parent />, document.getElementById ('root2'));

// ========================================兄弟组件间通讯
// class Parent extends React.Component {
//   constructor () {
//     super ();
//     this.state = {
//       msg: 'start',
//     };
//     this.transferMsg = this.transferMsg.bind (this);
//   }

//   transferMsg (msg) {
//     this.setState ({
//       msg,
//     });
//   }

//   componentDidUpdate () {
//     console.log ('Parent update');
//   }

//   render () {
//     return (
//       <div>
//         <Child_1
//           transferMsg={msg => this.transferMsg (msg)}
//           msg={this.state.msg}
//         />
//         <Child_2 msg={this.state.msg} />
//       </div>
//     );
//   }
// }

// class Child_1 extends React.Component {
//   componentDidMount () {
//     setTimeout (() => {
//       this.props.transferMsg ('Child_1触发父组件事件，更改父组件状态,兄弟组件数据同时改变');
//     }, 1000);
//   }

//   componentDidUpdate () {
//     console.log ('Child_1 update');
//   }

//   render () {
//     return (
//       <div>
//         <p onClick={()=>this.props.transferMsg('Child_1触发父组件事件,与兄弟组件同信')}>child_1 component:{this.props.msg}</p>
//       </div>
//     );
//   }
// }

// class Child_2 extends React.Component {
//   componentDidUpdate () {
//     console.log ('Child_2 update');
//   }

//   render () {
//     return (
//       <div>
//         <p>child_2 component: {this.props.msg}</p>
//         <Child_2_1 {...this.props} />
//       </div>
//     );
//   }
// }

// class Child_2_1 extends React.Component {
//   componentDidUpdate () {
//     console.log ('Child_2_1 update');
//   }

//   render () {
//     return (
//       <div>
//         <p>child_2_1 component: {this.props.msg}</p>
//       </div>
//     );
//   }
// }
// ReactDOM.render (<Parent />, document.getElementById ('root2'));

