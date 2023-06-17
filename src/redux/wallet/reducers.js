const reducers = {
  updateNetworkInfo: (state, action) => {
    state.connectedChainId = action.payload.connectedChainId;
    state.isCorrectNetwork = action.payload.isCorrectNetwork;
  },
};

export default reducers;
