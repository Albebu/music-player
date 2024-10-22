const Controls = ({ handleVolumeChange, handleLoopButton, handleRateChange, loop, rate }) => {
    return (
      <aside>
        <label htmlFor="volume">Volume</label>
        <input 
          id="volume" 
          name="volume" 
          type="range" 
          step={0.05} 
          max={1} 
          onChange={(e) => handleVolumeChange(e.target.value)}
        />
        <button onClick={handleLoopButton}>
          {loop ? 'Do not loop' : 'Loop'}
        </button>
        <label htmlFor="rate">Rate</label>
        <select onChange={(e) => { handleRateChange(e.target.value); }} name="rate" id="rate" defaultValue={rate}>
          <option value="0.5">x 0.5</option>
          <option value="1.0">x 1.0</option>
          <option value="1.25">x 1.25</option>
          <option value="1.5">x 1.5</option>
          <option value="2.0">x 2.0</option>
          <option value="2.5">x 2.5</option>
          <option value="3.0">x 3.0</option>
        </select>
      </aside>
    );
  };
  
  export default Controls;