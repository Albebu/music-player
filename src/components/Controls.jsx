const Controls = ({ handleVolumeChange, handleLoopButton, handleRateChange, loop, rate, handlePlayButton, isPaused }) => {
    return (
      <section className="w-full h-16 bg-pakistanGreen text-cornsilk flex items-center px-4 fixed bottom-0">
          <div className="flex items-center gap-4">
              <button onClick={handleLoopButton}>
                  {loop ? 'Do not loop' : 'Loop'}
              </button>
              <div>
                  <label htmlFor="rate">Rate</label>
                  <select className="text-black" onChange={(e) => handleRateChange(e.target.value)} name="rate" id="rate" defaultValue={rate}>
                      <option value="0.5">x 0.5</option>
                      <option value="1.0">x 1.0</option>
                      <option value="1.25">x 1.25</option>
                      <option value="1.5">x 1.5</option>
                      <option value="2.0">x 2.0</option>
                      <option value="2.5">x 2.5</option>
                      <option value="3.0">x 3.0</option>
                  </select>
              </div>
          </div>
          <div className="flex-grow flex justify-center">
              <button onClick={() => handlePlayButton(song)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {isPaused ? 'Stop' : 'Play'}
              </button>
          </div>
          <div className="flex flex-col items-center">
              <label htmlFor="volume">Volume</label>
              <input
                  id="volume"
                  name="volume"
                  type="range"
                  step={0.05}
                  max={1}
                  onChange={(e) => handleVolumeChange(e.target.value)}
              />
          </div>
      </section>

    );
  };
  
  export default Controls;