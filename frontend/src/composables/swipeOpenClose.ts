import { onMounted, onUnmounted } from "vue";

export function useSwipeOpenClose(open: () => void, close: () => void) {
  let startY = 0;

  onMounted(() => {
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
  });

  onUnmounted(() => {
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
  });

  function onTouchStart(event: TouchEvent) {
    startY = event.touches[0].clientY;
  }

  function onTouchEnd(event: TouchEvent) {
    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - startY;

    const threshold = 100;

    if (deltaY > threshold) {
      // Swipe down
      close();
    } else if (deltaY < -threshold) {
      // Swipe up
      open();
    }
  }
}
