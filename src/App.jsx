import { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("Not Detected");
  const [fileSize, setFileSize] = useState("-");
  const [selectedModel, setSelectedModel] = useState("GAN");
  const [recordCount, setRecordCount] = useState(5000);
  const [systemStatus, setSystemStatus] = useState("READY");
  const [isGenerating, setIsGenerating] = useState(false);

  const [terminalLogs, setTerminalLogs] = useState([
    "> SYNFRAME OS Boot Sequence Complete...",
    "> Generation Engine Loaded...",
    "> Awaiting Dataset...",
    "> System Ready."
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const extension = file.name.split(".").pop().toUpperCase();
    setSelectedFile(file.name);
    setFileType(extension);
    setFileSize((file.size / 1024).toFixed(2) + " KB");
    setSystemStatus("DATASET LOADED");

    setTerminalLogs((prev) => [
      ...prev,
      `> Dataset Loaded : ${file.name}`,
      `> File Type Detected : ${extension}`
    ]);
  };

  const startGeneration = () => {
    if (!selectedFile) {
      setTerminalLogs((prev) => [...prev, "> ERROR: No dataset injected."]);
      return;
    }

    setIsGenerating(true);
    setSystemStatus("PROCESSING");
    
    setTerminalLogs((prev) => [
      ...prev,
      `> Initializing ${selectedModel} architecture...`
    ]);

    setTimeout(() => {
      setSystemStatus("GENERATING");
      setTerminalLogs((prev) => [
        ...prev,
        `> Generating ${recordCount} synthetic records...`
      ]);
    }, 1500);

    setTimeout(() => {
      setSystemStatus("VALIDATING");
      setTerminalLogs((prev) => [
        ...prev,
        "> Validating generated dataset..."
      ]);
    }, 3500);

    setTimeout(() => {
      setSystemStatus("COMPLETE");
      setIsGenerating(false);
      setTerminalLogs((prev) => [
        ...prev,
        "> Synthetic dataset generated successfully.",
        "> Ready for download."
      ]);
    }, 5000);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <h1>SYNFRAME OS</h1>
          <p>Deep Generative Framework</p>
        </div>
        <div className="status">
          <div className="online">
            <span className="dot"></span>
            SYSTEM READY
          </div>
          <div className="version">v1.0</div>
        </div>
      </header>

      <main className="container">
        <section className="upload-panel">
          <h2>DATA INGESTION</h2>
          <div className="upload-content">
            <div className="upload-icon">⬇</div>
            <h3>INSERT YOUR DATASET</h3>
            <p>
              Select a dataset from your computer.
              <br />
              SYNFRAME OS will automatically detect the dataset format.
            </p>

            <div className="supported-files">
              <span>.CSV</span>
              <span>.JPG</span>
              <span>.PNG</span>
              <span>.TXT</span>
            </div>

            <input
              type="file"
              id="fileUpload"
              hidden
              onChange={handleFileUpload}
            />

            <label htmlFor="fileUpload" className="insert-btn">
              INSERT DATASET
            </label>

            {selectedFile && (
              <div className="file-info">
                <p>
                  📄 <strong>{selectedFile}</strong>
                </p>
                <p>Detected Type : {fileType}</p>
                <p>File Size : {fileSize}</p>
              </div>
            )}

            <div className="machine-status">{systemStatus}</div>
          </div>
        </section>

        <section className="middle">
          <section className="control-panel">
            <h2>GENERATION CONFIGURATION</h2>
            <div className="control-content">
              <div className="control-section">
                <label>Generation Model</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="model"
                      checked={selectedModel === "GAN"}
                      onChange={() => setSelectedModel("GAN")}
                    />
                    GAN
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="model"
                      checked={selectedModel === "VAE"}
                      onChange={() => setSelectedModel("VAE")}
                    />
                    VAE
                  </label>
                </div>
              </div>

              <div className="control-section">
                <label>Number of Synthetic Records</label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={recordCount}
                  onChange={(e) => setRecordCount(Number(e.target.value))}
                />
                <div className="record-display">{recordCount}</div>
              </div>

              <button
                className="generate-btn"
                onClick={startGeneration}
                disabled={isGenerating}
              >
                {isGenerating ? "GENERATING..." : "GENERATE SYNTHETIC DATA"}
              </button>
            </div>
          </section>

          <section className="status-panel">
            <h2>SYSTEM MONITOR</h2>
            <div className="status-content">
              <div className="status-item">
                <span>Dataset</span>
                <strong>{selectedFile || "Not Uploaded"}</strong>
              </div>
              <div className="status-item">
                <span>Detected Type</span>
                <strong>{fileType}</strong>
              </div>
              <div className="status-item">
                <span>Generation Model</span>
                <strong>{selectedModel}</strong>
              </div>
              <div className="status-item">
                <span>Synthetic Records</span>
                <strong>{recordCount}</strong>
              </div>
              <div className="status-item">
                <span>System Status</span>
                <strong>{systemStatus}</strong>
              </div>
            </div>
          </section>
        </section>

        <section className="terminal-panel">
          <h2>EXECUTION LOG</h2>
          <div className="terminal-window">
            {terminalLogs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;