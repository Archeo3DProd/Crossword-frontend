import confetti from 'canvas-confetti';

/**
 * Déclenche une explosion simple de confettis
 */
export const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
};

/**
 * Déclenche une célébration prolongée avec plusieurs gerbes
 */
export const launchConfettiBurst = () => {
  const duration = 1000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 30,
      spread: 60,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.5,
      },
    });
  }, 200);
};
