import React, { useState } from 'react';

const Popover = ({ value, position, show }) => {
  return (
    <div className={`popover ${show ? 'show' : ''}`} style={{ left: position }}>
      {value}
    </div>
  );
};

const SliderWithStep = () => {
  const [value, setValue] = useState(0);
  const [dragValue, setDragValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverValue, setHoverValue] = useState(0);
  const stops = [0, 25, 50, 75, 100]; // Predefined stops where the slider will snap

  // Function to find the nearest stop value
  const findClosestStop = (newValue) => {
    return stops.reduce((prev, curr) => {
      return Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev;
    });
  };

  // Handle slider value change while dragging (real-time value)
  const handleDragChange = (event) => {
    const newValue = parseInt(event.target.value);
    setDragValue(newValue);  // Show real-time value during drag
    setHoverValue(newValue); // Update the popover with the real-time value
  };

  // Handle snapping to the closest stop on mouse up (drag end)
  const handleMouseUp = () => {
    const closestStop = findClosestStop(dragValue);
    setValue(closestStop); // Snap to the closest stop
    setDragValue(closestStop); // Update drag value to the snapped value
  };

  // Handle mouse movement to update hover value for popover
  const handleMouseMove = (event) => {
    const sliderWidth = event.currentTarget.clientWidth;
    const mouseX = event.clientX - event.currentTarget.getBoundingClientRect().left;
    const percentage = (mouseX / sliderWidth) * 100;
    setHoverValue(percentage); // Show exact hover percentage
  };

  const popoverPosition = `${(hoverValue / 100) * 100}%`;
  const activeStopPosition = `${(dragValue / 100) * 100}%`; // Position of the active stop dynamically updated

  return (
    <div className="slider-wrapper">
      <div
        className="slider-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* The input slider */}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={dragValue}
          onChange={handleDragChange}
          onMouseUp={handleMouseUp} // Snap to the closest stop on mouse release
          className="slider"
        />
        
        {/* Show the popover when hovering */}
        {isHovered && (
          <Popover value={hoverValue.toFixed(0)} position={popoverPosition} show={isHovered} />
        )}

        {/* Display slider stops */}
        <div className="slider-stops">
          {stops.map((stop, index) => (
            <div
              key={index}
              className={`slider-stop ${value === stop ? 'active-stop' : ''}`}
              style={{ left: `${(stop / 100) * 100}%` }}
            ></div>
          ))}
        </div>

        {/* Dynamic active stop that moves with the drag value */}
        <div
          className="slider-stop active" // Add active class for dynamic movement
          style={{ left: activeStopPosition }} // This will move the stop based on drag value
        ></div>
      </div>
    </div>
  );
};

export default SliderWithStep;
