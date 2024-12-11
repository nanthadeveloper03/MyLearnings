// components/ProgressBar.js
const ProgressBar = ({ progress }) => {
  const progressStyle = {
    width: `${progress}%`,
    backgroundColor: '#ff8300',
    height: '10px',
    borderRadius: '5px',
    transition: 'width 0.3s ease-in-out',
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', marginBottom: '10px' }}>
      <div style={progressStyle} />
    </div>
  );
};

export default ProgressBar;
