export default function (context) {
  context.app.store.commit('setUserError', '')
  context.app.store.commit('setPostError', '')
}
