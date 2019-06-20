export default function (context) {
  context.store.dispatch('tryAutoLogin', context)
}
