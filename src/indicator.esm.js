import RMSProcessor from './rms-processor.esm.js';

const defaultOptions = {
    elementId: 'indicator',
    userMediaStream: null
};

export class Indicator {
    static create(options) {
        return new Indicator(options);
    }

    constructor(options = defaultOptions) {
        const parentElement = document.getElementById(options.elementId);
        const shadowElement = document.createElement('div');
        shadowElement.setAttribute('class', 'container');
        const shadowRoot = shadowElement.attachShadow({ mode: 'open' });

        const ledBox = document.createElement('led-box');
        ledBox.setAttribute('class', 'led-box');
        const icon = document.createElement('div');
        icon.setAttribute('class', 'led-blue');
        const info = document.createElement('p');
        info.setAttribute('class', 'rmsinfo');
        let style = document.createElement("style");
        style.textContent = `
        .container {
            background-size: cover;
          background: rgb(226,226,226); /* Old browsers */
          background: -moz-linear-gradient(top,  rgba(226,226,226,1) 0%, rgba(219,219,219,1) 50%, rgba(209,209,209,1) 51%, rgba(254,254,254,1) 100%); /* FF3.6+ */
          background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(226,226,226,1)), color-stop(50%,rgba(219,219,219,1)), color-stop(51%,rgba(209,209,209,1)), color-stop(100%,rgba(254,254,254,1))); /* Chrome,Safari4+ */
          background: -webkit-linear-gradient(top,  rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%); /* Chrome10+,Safari5.1+ */
          background: -o-linear-gradient(top,  rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%); /* Opera 11.10+ */
          background: -ms-linear-gradient(top,  rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%); /* IE10+ */
          background: linear-gradient(to bottom,  rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%); /* W3C */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe',GradientType=0 ); /* IE6-9 */
          padding: 20px;
        }
        
        .led-box {
          height: 30px;
          width: 25%;
          margin: 10px 0;
          float: left;
        }
        
        .led-box p {
          font-size: 12px;
          text-align: center;
          margin: 1em;
        }
        
        .led-red {
          margin: 0 auto;
          width: 24px;
          height: 24px;
          background-color: #F00;
          border-radius: 50%;
          box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;
          -webkit-animation: blinkRed 0.5s infinite;
          -moz-animation: blinkRed 0.5s infinite;
          -ms-animation: blinkRed 0.5s infinite;
          -o-animation: blinkRed 0.5s infinite;
          animation: blinkRed 0.5s infinite;
        }
        
        @-webkit-keyframes blinkRed {
            from { background-color: #F00; }
            50% { background-color: #A00; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 0;}
            to { background-color: #F00; }
        }
        @-moz-keyframes blinkRed {
            from { background-color: #F00; }
            50% { background-color: #A00; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 0;}
            to { background-color: #F00; }
        }
        @-ms-keyframes blinkRed {
            from { background-color: #F00; }
            50% { background-color: #A00; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 0;}
            to { background-color: #F00; }
        }
        @-o-keyframes blinkRed {
            from { background-color: #F00; }
            50% { background-color: #A00; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 0;}
            to { background-color: #F00; }
        }
        @keyframes blinkRed {
            from { background-color: #F00; }
            50% { background-color: #A00; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 0;}
            to { background-color: #F00; }
        }
        
        .led-yellow {
          margin: 0 auto;
          width: 24px;
          height: 24px;
          background-color: #FF0;
          border-radius: 50%;
          box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 12px;
          -webkit-animation: blinkYellow 1s infinite;
          -moz-animation: blinkYellow 1s infinite;
          -ms-animation: blinkYellow 1s infinite;
          -o-animation: blinkYellow 1s infinite;
          animation: blinkYellow 1s infinite;
        }
        
        @-webkit-keyframes blinkYellow {
            from { background-color: #FF0; }
            50% { background-color: #AA0; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 0; }
            to { background-color: #FF0; }
        }
        @-moz-keyframes blinkYellow {
            from { background-color: #FF0; }
            50% { background-color: #AA0; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 0; }
            to { background-color: #FF0; }
        }
        @-ms-keyframes blinkYellow {
            from { background-color: #FF0; }
            50% { background-color: #AA0; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 0; }
            to { background-color: #FF0; }
        }
        @-o-keyframes blinkYellow {
            from { background-color: #FF0; }
            50% { background-color: #AA0; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 0; }
            to { background-color: #FF0; }
        }
        @keyframes blinkYellow {
            from { background-color: #FF0; }
            50% { background-color: #AA0; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 0; }
            to { background-color: #FF0; }
        }
        
        .led-green {
          margin: 0 auto;
          width: 24px;
          height: 24px;
          background-color: #ABFF00;
          border-radius: 50%;
          box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px;
        }
        
        .led-blue {
          margin: 0 auto;
          width: 24px;
          height: 24px;
          background-color: #24E0FF;
          border-radius: 50%;
          box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #006 0 -1px 9px, #3F8CFF 0 2px 14px;
        }`;
        shadowRoot.appendChild(style);
        ledBox.appendChild(icon);
        ledBox.appendChild(info);
        shadowRoot.appendChild(ledBox);
        parentElement.appendChild(shadowElement);

        const audioContext = new AudioContext();

        audioContext.audioWorklet.addModule(RMSProcessor)
            .then(() => {
                const rmsNode = new AudioWorkletNode(audioContext, 'rms-processor');
                const mediaStreamSource = audioContext.createMediaStreamSource(options.userMediaStream);

                mediaStreamSource.connect(rmsNode);

                rmsNode.port.onmessage = (event) => {
                    const rmsDecibels = event.data;
                    console.log('rmsValue', rmsDecibels);
                    if (rmsDecibels === Number.NEGATIVE_INFINITY) {
                        info.textContent = 'No sound';
                        icon.setAttribute('class', 'led-red');
                    } else if (rmsDecibels > -0.5) {
                        info.textContent = 'Loud';
                        icon.setAttribute('class', 'led-yellow');
                    } else if (rmsDecibels < -90.0) {
                        info.textContent = 'Quiet';
                        icon.setAttribute('class', 'led-yellow');
                    } else {
                        info.textContent = 'Good';
                        icon.setAttribute('class', 'led-green');
                    }
                };
            })
            .catch((error) => console.error('Error loading audio worklet:', error));
    }
}

export default Indicator;
