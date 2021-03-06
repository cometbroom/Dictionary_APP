export const fromTo = (target, fromValues, toValues) => {
  const targetElement =
    typeof target === "string" ? document.querySelector(target) : target;

  const processAnimation = () => {
    Object.keys(fromValues).forEach((property) => {
      if (property in targetElement.style) {
        const SUFFIX = getSuffix(fromValues[property]);
        animate(
          targetElement,
          property,
          parseFloat(fromValues[property]),
          parseFloat(toValues[property]) - parseFloat(fromValues[property]),
          toValues.duration,
          SUFFIX
        );
      }
    });
  };

  if (toValues.delay) {
    setTimeout(processAnimation, toValues.delay * 1000);
  } else {
    processAnimation();
  }
};

const getSuffix = (value) => {
  if (value.endsWith("%")) return "%";
  if (value.endsWith("px")) return "px";
  return "";
};

const animate = (
  targetElement,
  property,
  startValue,
  range,
  duration,
  SUFFIX
) => {
  let start;
  let advance = true;

  const COEFFICIENT = getCoefficient(range, duration);
  const animationHolder = (timestamp) => {
    if (start === undefined) start = timestamp;
    const elapsed = timestamp - start;
    if (elapsed >= duration * 1000) advance = false;
    const STEP_SIZE = getStepSize(COEFFICIENT, elapsed, duration * 1000);
    const currentValue = startValue + STEP_SIZE;
    targetElement.style[property] = `${currentValue}${SUFFIX}`;
    advance && window.requestAnimationFrame(animationHolder);
  };
  if (advance) window.requestAnimationFrame(animationHolder);
};

const getCoefficient = (range, duration) => {
  return range / (duration * 1000);
};

const getStepSize = (COEFFICIENT, elapsed, durationMs) => {
  //Fix computer imperfection by a few epsilons by manually entering end time
  if (elapsed >= durationMs) {
    return COEFFICIENT * durationMs;
  } else {
    return COEFFICIENT * elapsed;
  }
};
