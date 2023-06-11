const StylePanel = `
  .panels {
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    margin-top: 7%;
  }

  .panel {
    background: #6B0F9C;
    box-shadow: inset 0 0 0 5px rgba(255,255,255,0.1);
    color: white;
    text-align: center;
    align-items: center;
    transition:
      font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
      flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
      background 0.2s;
    font-size: 10px;
    background-size: cover;
    background-position: center;
    flex: 1;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }



  /* Flex Items */
  .panel > * {
    margin: 0;
    width: 100%;
    transition: transform 0.5s;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .panel > *:first-child { transform: translateY(-100%); }
  .panel.panel.open-active > *:first-child { transform: translateY(0); }
  .panel > *:last-child { transform: translateY(100%); }
  .panel.open-active > *:last-child { transform: translateY(0); }

  .panel p {
    text-transform: uppercase;
    
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
    font-size: 1em;
  }

  .panel p:nth-child(2) {
    font-size: 3em;
  }

  .panel.open {
    flex: 2;
    font-size: 25px;
  }

  @media only screen and (max-width: 600px) {
    .panel p {
      font-size: 1em;
    }
  }
  `;
  export default StylePanel;