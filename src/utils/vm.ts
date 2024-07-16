import type { ComponentInstance } from 'vue'

export function vmIsDestroyed(vm: ComponentInstance<any>) {
  return vm.isUnmounted === true || vm.isDeactivated === true
}
