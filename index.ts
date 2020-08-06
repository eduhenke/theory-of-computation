class FiniteStateMachine<Alphabet, State> {
  private currentState: State;
  readonly stateHistory: State[] = [];
  constructor (
    initialState: State,
    private readonly transitionFunction: (s: State, a: Alphabet) => State,
    private readonly finalStates: State[]
  ) {
    this.currentState = initialState;
  }

  process = (inputs: Alphabet[]): State =>
    inputs.reduce(
      (currentState, input) =>
        this.transitionFunction(currentState, input),
      this.currentState
    )
  
  accepts = (inputs: Alphabet[]): boolean =>
    this.finalStates.includes(this.process(inputs))
}

type Binary = 0 | 1;
type State = 'even' | 'odd';

const fsm = new FiniteStateMachine<Binary, State>('even', (s, a) => {
  switch (s) {
    case 'even': return a === 0
      ? 'even'
      : 'odd'
    case 'odd': return a === 0
      ? 'even'
      : 'odd'
  }
}, ['even'])

const inputs: Binary[] = [ 0, 0, 1, 1, 0, 1, 0 ];

const accepts = fsm.accepts(inputs)

const number = inputs.join('');

console.log({
  accepts,
  inputs,
  number: parseInt(number, 2)
})