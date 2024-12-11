import React, { useState } from 'react';

const Popover = ({ value, position, show }) => {
  return (
    <div className={`popover ${show ? 'show' : ''}`} style={{ left: position }}>
      {value}
    </div>
  );
};

const SliderWithStep = ({typeside,balance,passValue}) => {

  const [value, setValue] = useState(0);
  const [dragValue, setDragValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverValue, setHoverValue] = useState(0);
  const stops = [0, 25, 50, 75, 100]; // Predefined stops where the slider will snap

  // Function to find the nearest stop value
  // const findClosestStop = (newValue) => {
  //   return stops.reduce((prev, curr) => {
  //     return Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev;
  //   });
  // };

  // Handle slider value change while dragging (real-time value)
  const handleDragChange = (event) => {
    // const newValue = parseInt(event.target.value);
    const newValue = parseInt(event.target.value, 10);
    passValue(newValue)
    // console.log(newValue);
    setDragValue(newValue);  
    // setHoverValue(newValue); 
  };

  // Handle snapping to the closest stop on mouse up (drag end)
  // const handleMouseUp = () => {
  //   const closestStop = findClosestStop(dragValue);
  //   setValue(closestStop); // Snap to the closest stop
  //   setDragValue(closestStop); // Update drag value to the snapped value
  // };

  // Handle mouse movement to update hover value for popover
  const handleMouseMove = (event) => {
    const sliderWidth = event.currentTarget.clientWidth;
    const mouseX = event.clientX - event.currentTarget.getBoundingClientRect().left;
    // const percentage = (mouseX / sliderWidth) * 100;
    const percentage = Math.min(Math.max((mouseX / sliderWidth) * 100, 0), 100);
    setHoverValue(percentage); // Show exact hover percentage
  };

    // Handle track click to set value directly
  const handleTrackClick = (event) => {
    const sliderWidth = event.currentTarget.clientWidth;
    const clickX = event.clientX - event.currentTarget.getBoundingClientRect().left;
    const newValue = Math.round((clickX / sliderWidth) * 100);
    setValue(newValue);
    setDragValue(newValue);
    passValue(newValue);
  };

  const popoverPosition = `${hoverValue}%`;
  const sliderPosition = `${dragValue}%`; 

  // const popoverPosition = `${(hoverValue / 100) * 100}%`;
  // const activeStopPosition = `${(dragValue / 100) * 100}%`; 

  return (
    <div className="slider-wrapper">
      <div
        className="slider-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove} 
        onClick={handleTrackClick}
      >
        {/* The input slider */}
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={dragValue}
          onChange={handleDragChange}
          // onMouseUp={handleMouseUp} 
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

        {/* Dynamic Active Stop */}
        <div
          className="slider-stop active" style={{ left: sliderPosition }}
          // style={{ left: activeStopPosition }} 
        ></div>
      </div>
    </div>
  );
};

export default SliderWithStep;
