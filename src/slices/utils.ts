export function resetStateToInitial(
    state: { [key: string]: unknown },
    initial: { [key: string]: any }
) {
    for (let key of Object.keys(state)) {
      state[key] = initial[key];
    }
    return state;
}
  