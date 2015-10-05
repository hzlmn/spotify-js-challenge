export default function* () {
  yield this.start('build');
}

export function* build() {
  yield this.log('build')
}
